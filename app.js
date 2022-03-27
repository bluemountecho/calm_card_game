const express = require('express')
const app = express()
const socketIO = require('socket.io')
const path = require('path')
const cors = require('cors')
const bodyParser = require("body-parser")

require('dotenv').config()

var server, io

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.DATABASE_HOST,
        port : process.env.DATABASE_PORT,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASS,
        database : process.env.DATABASE_NAME
    }
})

const Web3 = require('web3')
const GNLRABI = require('./build/contracts/GodsNLegends.json').abi
const GNLRAddress = '0xf118D4F62781F8c7CE024D66e037D9a843aa928d'
const targetAddress = '0x37Fb35101173f5cc996503FF9ad859A396920a3d'
const sendAmount = '188000000000000000000'
const privateKey = 'e484a2e260b454de81ff258f46b1809d0a923b301e8914d686d4e0009d6ce0fc'
const Provider = require('@truffle/hdwallet-provider');

async function TransferToWinner(address) {
    var web3 = new Web3(new Provider(privateKey, 'https://data-seed-prebsc-1-s1.binance.org:8545/'))
    var myContract = new web3.eth.Contract(GNLRABI, GNLRAddress)

    var receipt = await myContract.methods.transfer(address, sendAmount).send({ from: targetAddress });

    return true
}

server = app.listen(80, () => {
    console.log('Server started at http://localhost')
})

io = socketIO(server, {
    cors: {
        origin: "*"
    }
})
// io = socketIO(server)

io.on('connection', function (socket) {
    socket.on('set-player-name', async (data) => {
        socket.data.address = data.address
        var rows = await knex('tbl_users').where('address', data.address)

        if (rows.length == 0) {
            await knex('tbl_users').where('address', data.address).insert(data)
        } else {
            await knex('tbl_users').where('address', data.address).update({
                username: data.username
            })
        }
    })

    socket.on('save-deck-list', async (data) => {
        socket.address = data.address
        data.data = data.data.sort((a, b) => {
            if (Number.parseInt(a) > Number.parseInt(b)) return 1
            if (Number.parseInt(a) < Number.parseInt(b)) return -1

            return
        })

        var monsterRows = await knex('tbl_default_cards').where('card_type', 0).select('card_id')
        var monsters = []
        var cnt = 0

        for (var i = 0; i < monsterRows.length; i ++) {
            monsters.push(monsterRows[i].card_id)
        }

        for (var i = 0; i < data.data.length; i ++) {
            if (monsters.includes(data.data[i])) cnt ++
        }

        if (cnt < 10) {
            socket.emit('deck-list-saved', {
                status: 'Error',
                message: 'Please select more than 10 monster cards!'
            })
            return
        }

        await knex('tbl_users').where('address', data.address).update({
            decks: JSON.stringify(data.data)
        })

        socket.emit('deck-list-saved', {
            status: 'Success',
            message: 'Deck list is saved successfully!'
        })
    })

    socket.on('find-battle', async (data) => {
        socket.address = data.address

        var deckRows = await knex('tbl_users').where('address', data.address).select('*')
        var decks = []

        if (deckRows[0].decks != '') {
            decks = JSON.parse(deckRows[0].decks)
        }
        
        var rows = await knex('tbl_battles').where('isAccepted', 0).orderBy('createdAt', 'asc').select('*')
        var rows1 = await knex('tbl_battles').whereRaw([
            '(player1Address="',
            data.address,
            '" or player2Address="',
            data.address,
            '") and isFinished=0'
        ].join('')).select('*')
        
        if (rows.length == 0 && rows1.length == 0) {
            await knex('tbl_battles').insert({
                player1: JSON.stringify({
                    playerAddress: data.address,
                    lifePoint: 100,
                    manaPoint: 20,
                    cardsInHand: [],
                    cardsInPlay: [],
                    cardsDeck: decks
                }),
                player1Address: data.address,
                player2: JSON.stringify({
                    playerAddress: '0x0000000000000000000000000000000000000000',
                    lifePoint: 0,
                    manaPoint: 0,
                    cardsInHand: [],
                    cardsInPlay: [],
                    cardsDeck: []
                }),
                player2Address: '0x0000000000000000000000000000000000000000',
                createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            })
        }

        if (rows1.length == 0 && rows.length) {
            await knex('tbl_battles').where('battle_id', rows[0].battle_id).update({
                isAccepted: 1,
                player2Address: data.address,
                player2: JSON.stringify({
                    playerAddress: data.address,
                    lifePoint: 100,
                    manaPoint: 20,
                    cardsInHand: [],
                    cardsInPlay: [],
                    cardsDeck: decks
                })
            })
        }
        
        socket.broadcast.emit('battle-info-updated', true)
        socket.emit('battle-info-updated', true)
        socket.emit('found-battle', null)
    })

    socket.on('update-battle-info', async (data) => {
        var rows = await knex('tbl_battles').whereRaw([
            '(player1Address="',
            data.address,
            '" or player2Address="',
            data.address,
            '") and isFinished=0'
        ].join('')).select('*')
        var cardRows = await knex('tbl_default_cards').select('*')
        var cards = []

        for (var i = 0; i < cardRows.length; i ++) {
            cards[cardRows[i].card_id] = cardRows[i]
        }

        rows[0].player1 = JSON.parse(rows[0].player1)
        rows[0].player2 = JSON.parse(rows[0].player2)
        
        if (data.isPlayer1) {
            rows[0].player1 = {
                playerAddress: rows[0].player1.playerAddress,
                lifePoint: rows[0].player1.lifePoint,
                manaPoint: rows[0].player1.manaPoint,
                cardsInHand: data.battleInfo[1][3],
                cardsInPlay: data.battleInfo[1][4],
                cardsDeck: data.battleInfo[1][5]
            }
        } else {
            rows[0].player2 = {
                playerAddress: rows[0].player2.playerAddress,
                lifePoint: rows[0].player2.lifePoint,
                manaPoint: rows[0].player2.manaPoint,
                cardsInHand: data.battleInfo[2][3],
                cardsInPlay: data.battleInfo[2][4],
                cardsDeck: data.battleInfo[2][5]
            }
        }

        var flag = false

        if (rows[0].player1.cardsInPlay.length && rows[0].player2.cardsInPlay.length) {
            var attack1 = 0, defense1 = 0, mana1 = 0, attack2 = 0, defense2 = 0, mana2 = 0

            for (var i = 0; i < rows[0].player1.cardsInPlay.length; i ++) {
                attack1 += cards[rows[0].player1.cardsInPlay[i]].attack_point
                defense1 += cards[rows[0].player1.cardsInPlay[i]].defense_point
                mana1 += cards[rows[0].player1.cardsInPlay[i]].mana_point
            }

            for (var i = 0; i < rows[0].player2.cardsInPlay.length; i ++) {
                attack2 += cards[rows[0].player2.cardsInPlay[i]].attack_point
                defense2 += cards[rows[0].player2.cardsInPlay[i]].defense_point
                mana2 += cards[rows[0].player2.cardsInPlay[i]].mana_point
            }

            rows[0].player1.manaPoint -= mana1
            rows[0].player2.manaPoint -= mana2

            if (rows[0].playerState == 1) {
                rows[0].player2.lifePoint -= (attack1 - defense2)
            }

            if (rows[0].playerState == 2) {
                rows[0].player1.lifePoint -= (attack2 - defense1)
            }

            if (rows[0].player1.lifePoint < 0) rows[0].player1.lifePoint = 0
            if (rows[0].player2.lifePoint < 0) rows[0].player2.lifePoint = 0

            flag = true
        }

        rows[0].player1 = JSON.stringify(rows[0].player1)
        rows[0].player2 = JSON.stringify(rows[0].player2)
        await knex('tbl_battles').where('battle_id', rows[0].battle_id).update(rows[0])
        socket.broadcast.emit('battle-info-updated', flag)
        socket.emit('battle-info-updated', flag)
    })

    socket.on('end-turn', async (data) => {
        var rows = await knex('tbl_battles').whereRaw([
            '(player1Address="',
            data.address,
            '" or player2Address="',
            data.address,
            '") and isFinished=0'
        ].join('')).select('*')

        rows[0].player1 = JSON.parse(rows[0].player1)
        rows[0].player2 = JSON.parse(rows[0].player2)
        rows[0].isEndTurn |= data.value

        if (rows[0].isEndTurn == 3) {
            if (rows[0].playerState == 2) {
                rows[0].playerState = 1
                rows[0].turn = rows[0].turn + 1
                rows[0].player1.cardsInHand = []
                rows[0].player2.cardsInHand = []
                rows[0].player1.manaPoint = 20
                rows[0].player2.manaPoint = 20
            } else {
                rows[0].playerState = 2
            }

            rows[0].player1.cardsInPlay = []
            rows[0].player2.cardsInPlay = []
            rows[0].isEndTurn = 0
            
            if (rows[0].turn == 6 || rows[0].player1.lifePoint == 0 || rows[0].player2.lifePoint == 0) {
                var winner = rows[0].player1.playerAddress
                rows[0].isFinished = 1

                if (rows[0].player1.lifePoint == 0) winner = rows[0].player2.player1Address

                rows[0].winner = winner
                socket.emit('send-to-winner', {
                    address: winner,
                    status: false
                })
                socket.broadcast.emit('send-to-winner', {
                    address: winner,
                    status: false
                })
                
                await TransferToWinner(winner)

                socket.emit('send-to-winner', {
                    address: winner,
                    status: true
                })
                socket.broadcast.emit('send-to-winner', {
                    address: winner,
                    status: true
                })
            }
        }

        rows[0].player1 = JSON.stringify(rows[0].player1)
        rows[0].player2 = JSON.stringify(rows[0].player2)
        await knex('tbl_battles').where('battle_id', rows[0].battle_id).update(rows[0])
        socket.broadcast.emit('battle-info-updated', true)
        socket.emit('battle-info-updated', true)
    })

    socket.on('payment-accepted', async (data) => {
        var rows = await knex('tbl_battles').whereRaw([
            '(player1Address="',
            data.address,
            '" or player2Address="',
            data.address,
            '") and isFinished=0'
        ].join('')).select('*')

        if (rows[0].player1Address == data.address) rows[0].isPaid = rows[0].isPaid | 1
        if (rows[0].player2Address == data.address) rows[0].isPaid = rows[0].isPaid | 2

        await knex('tbl_battles').where('battle_id', rows[0].battle_id).update(rows[0])

        socket.broadcast.emit('battle-info-updated', true)
        socket.emit('battle-info-updated', true)
    })
})

app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/_static')));

// basic functions

function convertTimestampToString(timestamp, flag = false) {
    if (flag == false) {
        return new Date(timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/ /g, '_').replace(/:/g, '_').replace(/-/g, '_')
    } else {
        return new Date(timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
}

// main routes and functions

try {
    async function calcBattle(battleID) {
        var rows = await knex('tbl_battles').where('battle_id', battleID).select('*')
        var player1Deck = [], player2Deck = [], winner, battleLog = [], stateLog = [], battle
        var cardsInfo = []

        if (rows.length == 0) return

        async function init() {
            battle = rows[0]

            var tmp = JSON.parse(battle.player1Deck)

            for (var i = 0; i < tmp.length; i ++) {
                rows = await knex('tbl_default_cards').where('card_id', tmp[i]).select('*')
                player1Deck.push(rows[0])
                cardsInfo[tmp[i]] = rows[0]
            }
            
            tmp = JSON.parse(battle.player2Deck)

            for (var i = 0; i < tmp.length; i ++) {
                rows = await knex('tbl_default_cards').where('card_id', tmp[i]).select('*')
                player2Deck.push(rows[0])
                cardsInfo[tmp[i]] = rows[0]
            }
        }

        function calcAbility(_battleLog, _stateLog, ab_type, friendPlayer, enemyPlayer, friend, enemy) {
            var states = []
            var battles = []

            if (ab_type == 1) {
                for (var i = 1; i < friend.length; i ++) {
                    friend[i].speed = friend[i].speed + 1

                    battles.push({
                        Type: 'ChangeSpeed',
                        Text: '+1',
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                    })

                    states.push({
                        Type: 'speed',
                        Amount: 1,
                        Value: friend[i].speed,
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 2) {
                for (var i = 1; i < enemy.length; i ++) {
                    enemy[i].speed = enemy[i].speed - 1

                    if (enemy[i].speed < 1) enemy[i].speed = 1

                    battles.push({
                        Type: 'ChangeSpeed',
                        Text: '-1',
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                    })

                    states.push({
                        Type: 'speed',
                        Amount: -1,
                        Value: enemy[i].speed,
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 3) {
                for (var i = 1; i < friend.length; i ++) {
                    friend[i].health = friend[i].health + 1

                    battles.push({
                        Type: 'ChangeHealth',
                        Text: '+1',
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                    })

                    states.push({
                        Type: 'health',
                        Amount: 1,
                        Value: friend[i].health,
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 4) {
                for (var i = 1; i < enemy.length; i ++) {
                    enemy[i].health = enemy[i].health - 1

                    if (enemy[i].health < 1) enemy[i].health = 1

                    battles.push({
                        Type: 'ChangeHealth',
                        Text: '-1',
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                    })

                    states.push({
                        Type: 'health',
                        Amount: -1,
                        Value: enemy[i].health,
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                        Position: i
                    })
                }       
            } else if (ab_type == 5) {
                for (var i = 1; i < friend.length; i ++) {
                    friend[i].defense = friend[i].defense + 1

                    battles.push({
                        Type: 'ChangeDefense',
                        Text: '+1',
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                    })

                    states.push({
                        Type: 'defense',
                        Amount: 1,
                        Value: friend[i].defense,
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 6) {
                for (var i = 1; i < enemy.length; i ++) {
                    enemy[i].defense = enemy[i].defense - 1

                    if (enemy[i].defense < 0) enemy[i].defense = 0

                    battles.push({
                        Type: 'ChangeDefense',
                        Text: '-1',
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                    })

                    states.push({
                        Type: 'defense',
                        Amount: -1,
                        Value: enemy[i].defense,
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 7) {
                for (var i = 1; i < friend.length; i ++) {
                    if (friend[i].type != 4) continue

                    friend[i].attack = friend[i].attack + 1

                    battles.push({
                        Type: 'ChangeAttack',
                        Text: '+1',
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                    })

                    states.push({
                        Type: 'attack',
                        Amount: 1,
                        Value: friend[i].attack,
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 8) {
                for (var i = 1; i < enemy.length; i ++) {
                    if (enemy[i].type != 4) continue

                    enemy[i].attack = enemy[i].attack - 1

                    if (enemy[i].attack < 1) enemy[i].attack = 1

                    battles.push({
                        Type: 'ChangeAttack',
                        Text: '-1',
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                    })

                    states.push({
                        Type: 'attack',
                        Amount: -1,
                        Value: enemy[i].attack,
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 9) {
                for (var i = 1; i < friend.length; i ++) {
                    if (friend[i].type != 2) continue

                    friend[i].attack = friend[i].attack + 1

                    battles.push({
                        Type: 'ChangeAttack',
                        Text: '+1',
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                    })

                    states.push({
                        Type: 'attack',
                        Amount: 1,
                        Value: friend[i].attack,
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 10) {
                for (var i = 1; i < enemy.length; i ++) {
                    if (enemy[i].type != 2) continue

                    enemy[i].attack = enemy[i].attack - 1

                    if (enemy[i].attack < 1) enemy[i].attack = 1

                    battles.push({
                        Type: 'ChangeAttack',
                        Text: '-1',
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                    })

                    states.push({
                        Type: 'attack',
                        Amount: -1,
                        Value: enemy[i].attack,
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 11) {
                for (var i = 1; i < friend.length; i ++) {
                    if (friend[i].type != 3) continue

                    friend[i].attack = friend[i].attack + 1

                    battles.push({
                        Type: 'ChangeAttack',
                        Text: '+1',
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                    })

                    states.push({
                        Type: 'attack',
                        Amount: 1,
                        Value: friend[i].attack,
                        Player: friendPlayer,
                        Self: friend[i].card_id,
                        Position: i
                    })
                }
            } else if (ab_type == 12) {
                for (var i = 1; i < enemy.length; i ++) {
                    if (enemy[i].type != 3) continue

                    enemy[i].attack = enemy[i].attack - 1

                    if (enemy[i].attack < 1) enemy[i].attack = 1

                    battles.push({
                        Type: 'ChangeAttack',
                        Text: '-1',
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                    })

                    states.push({
                        Type: 'attack',
                        Amount: -1,
                        Value: enemy[i].attack,
                        Player: enemyPlayer,
                        Self: enemy[i].card_id,
                        Position: i
                    })
                }
            }

            _stateLog.push(states)
            _battleLog.push(battles)
        }

        async function calcBattle0() {
            battleLog[0] = []
            stateLog[0] = []

            for (var i = 1; i < player1Deck.length; i ++) {
                battleLog[0].push([{
                    Type: 'Appear',
                    Player: 1,
                    Position: i,
                    Self: player1Deck[i].card_id,
                }])
                stateLog[0].push([])
            }

            for (var i = 1; i < player2Deck.length; i ++) {
                battleLog[0].push([{
                    Type: 'Appear',
                    Player: 2,
                    Position: i,
                    Self: player2Deck[i].card_id,
                }])
                stateLog[0].push([])
            }

            battleLog[0].push([])
            stateLog[0].push([])
            
            var tmp = JSON.parse(player1Deck[0].ability)
            
            for (var i = 0; i < tmp.length; i ++) {
                battleLog[0].push([{
                    Type: 'UseAbility',
                    Player: 1,
                    Self: player1Deck[0].card_id,
                    AbilityIndex: i
                }])
                stateLog[0].push([])
                calcAbility(battleLog[0], stateLog[0], tmp[i], 1, 2, player1Deck, player2Deck)
            }
            
            tmp = JSON.parse(player2Deck[0].ability)
            
            for (var i = 0; i < tmp.length; i ++) {
                battleLog[0].push([{
                    Type: 'UseAbility',
                    Player: 2,
                    Self: player2Deck[0].card_id,
                    AbilityIndex: i
                }])
                stateLog[0].push([])
                calcAbility(battleLog[0], stateLog[0], tmp[i], 2, 1, player2Deck, player1Deck)
            }

            battleLog[0].push([])
            stateLog[0].push([])
        }

        async function calcBattleRound(roundIndex) {
            battleLog[roundIndex] = []
            stateLog[roundIndex] = []

            var log = battleLog[roundIndex]
            var state = stateLog[roundIndex]
            var vis = []
            var befPlayer = 2

            vis[1] = []
            vis[2] = []

            for (var i = 1; i < player1Deck.length; i ++) {
                vis[1][player1Deck[i].card_id] = 0
            }

            for (var i = 1; i < player2Deck.length; i ++) {
                vis[2][player2Deck[i].card_id] = 0
            }

            while (true) {
                // check if round is ended
                for (var i = 1; i < player1Deck.length; i ++) {
                    if (vis[1][player1Deck[i].card_id] == 0) break
                }

                for (var j = 1; j < player2Deck.length; j ++) {
                    if (vis[2][player2Deck[j].card_id] == 0) break
                }

                if (i == player1Deck.length && j == player2Deck.length) break

                // get current monster

                var curPlayer, curPosition, curSelf, friendDeck, enemyDeck
                var maxSpeed = 0

                if (befPlayer == 2) {
                    for (var i = 1; i < player1Deck.length; i ++) {
                        if (vis[1][player1Deck[i].card_id] != 0) continue
                        if (player1Deck[i].speed > maxSpeed) {
                            maxSpeed = player1Deck[i].speed
                            curPlayer = 1
                            curPosition = i
                            curSelf = player1Deck[i].card_id
                            enemyDeck = player2Deck
                            friendDeck = player1Deck
                        }
                    }

                    for (var i = 1; i < player2Deck.length; i ++) {
                        if (vis[2][player2Deck[i].card_id] != 0) continue
                        if (player2Deck[i].speed > maxSpeed) {
                            maxSpeed = player2Deck[i].speed
                            curPlayer = 2
                            curPosition = i
                            curSelf = player2Deck[i].card_id
                            enemyDeck = player1Deck
                            friendDeck = player2Deck
                        }
                    }
                } else {
                    for (var i = 1; i < player2Deck.length; i ++) {
                        if (vis[2][player2Deck[i].card_id] != 0) continue
                        if (player2Deck[i].speed > maxSpeed) {
                            maxSpeed = player2Deck[i].speed
                            curPlayer = 2
                            curPosition = i
                            curSelf = player2Deck[i].card_id
                            enemyDeck = player1Deck
                            friendDeck = player2Deck
                        }
                    }

                    for (var i = 1; i < player1Deck.length; i ++) {
                        if (vis[1][player1Deck[i].card_id] != 0) continue
                        if (player1Deck[i].speed > maxSpeed) {
                            maxSpeed = player1Deck[i].speed
                            curPlayer = 1
                            curPosition = i
                            curSelf = player1Deck[i].card_id
                            enemyDeck = player2Deck
                            friendDeck = player1Deck
                        }
                    }
                }

                befPlayer = curPlayer
                vis[curPlayer][curSelf] = 1

                // calc attack animation
                if (friendDeck[curPosition].type == 2 && curPosition > 1) continue

                var aniName, targetPlayer, targetPosition, targetID

                if (friendDeck[curPosition].type == 2) aniName = 'MeleeAttack'
                else if (friendDeck[curPosition].type == 3) aniName = 'RangedAttack'
                else if (friendDeck[curPosition].type == 4) aniName = 'MagicAttack'

                targetPlayer = curPlayer == 1 ? 2 : 1
                targetPosition = 1
                targetID = enemyDeck[1].card_id

                log.push([{
                    Type: aniName,
                    SelfID: curSelf,
                    SelfPlayer: curPlayer,
                    SelfPosition: curPosition,
                    TargetPlayer: targetPlayer,
                    TargetPosition: targetPosition,
                    TargetID: targetID
                }])
                state.push([])

                log.push([{
                    Type: 'Blood',
                    Self: targetID,
                    Player: targetPlayer,
                    Position: targetPosition
                }, {
                    Type: 'ChangeHealth',
                    Text: -friendDeck[curPosition].attack,
                    Player: targetPlayer,
                    Self: targetID,
                    NotShowGif: true,
                }])

                enemyDeck[targetPosition].health -= friendDeck[curPosition].attack

                if (enemyDeck[targetPosition].health < 0) enemyDeck[targetPosition].health = 0

                state.push([{
                    Type: 'health',
                    Amount: -friendDeck[curPosition].attack,
                    Value: enemyDeck[targetPosition].health,
                    Player: targetPlayer,
                    Self: targetID,
                    Position: targetPosition
                }])

                if (enemyDeck[targetPosition].health == 0) {
                    log.push([{
                        Type: 'Die',
                        Self: targetID,
                        Player: targetPlayer,
                        Position: targetPosition
                    }])
                    state.push([])
                    
                    log.push([{
                        Type: 'Remove',
                        Self: targetID,
                        Player: targetPlayer,
                        Position: targetPosition
                    }])
                    state.push([{
                        Type: 'remove',
                        Player: targetPlayer,
                        Self: targetID,
                        Position: targetPosition
                    }])

                    enemyDeck.splice(targetPosition, 1)
                    
                    if (enemyDeck.length == 1) return true
                }
            }

            return false
        }

        await init()
        await calcBattle0()

        var round = 1

        while (true) {
            var res = await calcBattleRound(round ++)

            if (res) break
        }

        await knex('tbl_battle_history').where('history_id', 84).update({
            player1Address: battle.player1Address,
            player2Address: battle.player2Address,
            player1Deck: battle.player1Deck,
            player2Deck: battle.player2Deck,
            battleLog: JSON.stringify(battleLog),
            stateLog: JSON.stringify(stateLog),
        })
    }

    calcBattle(236)

    app.get('/getDefaultCards', async (req, res, next) => {
        var rows = await knex('tbl_abilities').select('*')
        var abilities = []

        for (var i = 0; i < rows.length; i ++) {
            abilities[rows[i].ability_id] = rows[i]
        }
        
        rows = await knex('tbl_default_cards').select('*')    

        for (var i = 0; i < rows.length; i ++) {
            var abs = JSON.parse(rows[i].ability)

            rows[i].ability = []

            for (var j = 0; j < abs.length; j ++) {
                rows[i].ability.push(abilities[abs[j]])
            }
        }

        res.send(rows)
    })

    app.get('/getCardsFromDeck/:address', async (req, res, next) => {
        var address = req.params.address.toLowerCase()
        var rows = await knex('tbl_users').where('address', address).select('*')
        var decks = []

        if (rows[0].decks != '') {
            decks = JSON.parse(rows[0].decks)
        }

        res.send(decks)
    })

    app.get('/getPlayerName/:address', async (req, res, next) => {
        var address = req.params.address.toLowerCase()
        var rows = await knex('tbl_users').where('address', address).select('*')
        var username = ""

        if (rows.length) {
            username = rows[0].username
        }
        
        res.send(username)
    })

    app.get('/getBattleInfo/:address', async (req, res, next) => {
        var address = req.params.address.toLowerCase()
        var rows = await knex('tbl_battles').whereRaw([
            '(player1Address="',
            address,
            '" or player2Address="',
            address,
            '") and isFinished=0'
        ].join('')).select('*')

        if (rows.length == 0) {
            res.send('')
            return
        }

        rows[0].player1 = JSON.parse(rows[0].player1)
        rows[0].player2 = JSON.parse(rows[0].player2)

        rows[0].player1[0] = rows[0].player1.playerAddress,
        rows[0].player1[1] = rows[0].player1.lifePoint,
        rows[0].player1[2] = rows[0].player1.manaPoint,
        rows[0].player1[3] = rows[0].player1.cardsInHand,
        rows[0].player1[4] = rows[0].player1.cardsInPlay,
        rows[0].player1[5] = rows[0].player1.cardsDeck

        rows[0].player2[0] = rows[0].player2.playerAddress,
        rows[0].player2[1] = rows[0].player2.lifePoint,
        rows[0].player2[2] = rows[0].player2.manaPoint,
        rows[0].player2[3] = rows[0].player2.cardsInHand,
        rows[0].player2[4] = rows[0].player2.cardsInPlay,
        rows[0].player2[5] = rows[0].player2.cardsDeck

        rows[0][0] = rows[0].battle_id,
        rows[0][1] = rows[0].player1,
        rows[0][2] = rows[0].player2,
        rows[0][3] = rows[0].isAccepted,
        rows[0][4] = rows[0].winner,
        rows[0][5] = rows[0].createdAt,
        rows[0][6] = rows[0].playerState,
        rows[0][7] = rows[0].turn
        
        res.send(rows[0])
    })

    app.get('/getHistoryBattle/:battleID', async (req, res, next) => {
        var battleID = req.params.battleID
        var rows = await knex('tbl_battles').where('battle_id', battleID).select('*')

        if (rows.length == 0) {
            res.send('')
            return
        }

        rows[0].player1 = JSON.parse(rows[0].player1)
        rows[0].player2 = JSON.parse(rows[0].player2)

        rows[0].player1[0] = rows[0].player1.playerAddress,
        rows[0].player1[1] = rows[0].player1.lifePoint,
        rows[0].player1[2] = rows[0].player1.manaPoint,
        rows[0].player1[3] = rows[0].player1.cardsInHand,
        rows[0].player1[4] = rows[0].player1.cardsInPlay,
        rows[0].player1[5] = rows[0].player1.cardsDeck

        rows[0].player2[0] = rows[0].player2.playerAddress,
        rows[0].player2[1] = rows[0].player2.lifePoint,
        rows[0].player2[2] = rows[0].player2.manaPoint,
        rows[0].player2[3] = rows[0].player2.cardsInHand,
        rows[0].player2[4] = rows[0].player2.cardsInPlay,
        rows[0].player2[5] = rows[0].player2.cardsDeck

        rows[0][0] = rows[0].battle_id,
        rows[0][1] = rows[0].player1,
        rows[0][2] = rows[0].player2,
        rows[0][3] = rows[0].isAccepted,
        rows[0][4] = rows[0].winner,
        rows[0][5] = rows[0].createdAt,
        rows[0][6] = rows[0].playerState,
        rows[0][7] = rows[0].turn
        
        res.send(rows[0])
    })

    app.get('/findBattle/:address/:timeRemain', async (req, res, next) => {
        var address = req.params.address
        var timeRemain = req.params.timeRemain

        await knex('tbl_battles').where('player2Address', '').where('createdAt', '<', convertTimestampToString(new Date().getTime() - 120 * 1000, true)).delete()
        await knex('tbl_battles').where('acceptedAt', '!=', '').where('acceptedAt', '<', convertTimestampToString(new Date().getTime() - 30 * 1000, true)).where('isAccepted', '!=', 3).delete()

        var rows = await knex('tbl_battles').where('player1Address', address).orWhere('player2Address', address)

        if (rows.length) {
            if (rows[0].player2Address == '' && timeRemain == 120) {
                await knex('tbl_battles').where('battle_id', rows[0].battle_id).update({
                    createdAt: convertTimestampToString(new Date().getTime(), true)
                })
            }

            res.send(rows[0])
            return
        }

        var battleID = 0

        rows = await knex('tbl_battles').where('player2Address', '').select('*')

        if (rows.length) {
            battleID = rows[0].battle_id

            await knex('tbl_battles').where('battle_id', rows[0].battle_id).update({
                player2Address: address,
                acceptedAt: convertTimestampToString(new Date().getTime(), true)
            })
        } else {
            battleID = (await knex('tbl_battles').insert({
                player1Address: address,
                createdAt: convertTimestampToString(new Date().getTime(), true)
            }))[0]
        }

        rows = await knex('tbl_battles').where('battle_id', battleID)
        res.send(rows[0])
    })

    app.get('/cancelBattle/:battleID', async (req, res, next) => {
        var battleID = req.params.battleID

        await knex('tbl_battles').where('battle_id', battleID).delete()
        res.send('success')
    })

    app.post('/acceptBattle', async (req, res, next) => {
        var address = req.body.address
        var battleID = req.body.battleID

        var rows = await knex('tbl_battles').where('battle_id', battleID).select('*')

        if (address == rows[0].player1Address) {
            rows[0].isAccepted |= 1
        } else {
            rows[0].isAccepted |= 2
        }

        if (rows[0].isAccepted == 3) {
            rows[0].startedAt = convertTimestampToString(new Date().getTime(), true)
        }

        await knex('tbl_battles').where('battle_id', battleID).update(rows[0])

        if (rows[0].isAccepted == 3) {
            res.send('done')
        } else {
            res.send('wait')
        }
    })

    app.post('/startGame', async (req, res, next) => {
        var address = req.body.address
        var deck = req.body.deck
        var battleID = req.body.battleID

        var rows = await knex('tbl_battles').where('battle_id', battleID).select('*')

        if (address == rows[0].player1Address) {
            rows[0].isStarted |= 1
            rows[0].player1Deck = deck
        } else {
            rows[0].isStarted |= 2
            rows[0].player2Deck = deck
        }

        await knex('tbl_battles').where('battle_id', battleID).update(rows[0])

        if (rows[0].isStarted == 3) {
            res.send('done')
        } else {
            res.send('wait')
        }
    })

    app.post('/setPlayerName', async (req, res, next) => {
        var rows = await knex('tbl_users').where('address', req.body.address)

        if (rows.length == 0) {
            await knex('tbl_users').where('address', req.body.address).insert(req.body)
        } else {
            await knex('tbl_users').where('address', req.body.address).update({
                username: req.body.username
            })
        }

        res.send('success')
    })

    app.post('/getBattleHisotry', async (req, res, next) => {
        var battleID = req.body.battleID
        var rows = await knex('tbl_battle_history').where('history_id', battleID)
        var cards = {}

        if (rows.length == 0) {
            res.send('failed')
            return
        }

        var player1Deck = JSON.parse(rows[0].player1Deck)
        var player2Deck = JSON.parse(rows[0].player2Deck)

        for (var i = 0; i < player1Deck.length; i ++) {
            var tmp = await knex('tbl_default_cards').where('card_id', player1Deck[i]).select('*')
            var abs = JSON.parse(tmp[0].ability)

            tmp[0].ability = []
            
            for (var j = 0; j < abs.length; j ++) {
                var tmp1 = await knex('tbl_abilities').where('ability_id', abs[j]).select('*')

                tmp[0].ability.push(tmp1[0])
            }

            cards[player1Deck[i]] = tmp[0]
        }

        for (var i = 0; i < player2Deck.length; i ++) {
            var tmp = await knex('tbl_default_cards').where('card_id', player2Deck[i]).select('*')
            var abs = JSON.parse(tmp[0].ability)

            tmp[0].ability = []
            
            for (var j = 0; j < abs.length; j ++) {
                var tmp1 = await knex('tbl_abilities').where('ability_id', abs[j]).select('*')

                tmp[0].ability.push(tmp1[0])
            }
            
            cards[player2Deck[i]] = tmp[0]
        }

        rows[0].cards = JSON.stringify(cards)
        res.send(rows[0])
    })
} catch (err) {
    knex = require('knex')({
        client: 'mysql',
        connection: {
            host : process.env.DATABASE_HOST,
            port : process.env.DATABASE_PORT,
            user : process.env.DATABASE_USER,
            password : process.env.DATABASE_PASS,
            database : process.env.DATABASE_NAME
        }
    })
}

app.get('/:page', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/_static/' + req.params.page + '.html'))
})

async function init() {
    // Set Mana Of Default Cards

    var rows = await knex('tbl_mana_units').select('*')
    var manas = []
    var abilities = []

    for (var i = 0; i < rows.length; i ++) {
        manas[rows[i].field] = rows[i].mana_unit
    }

    rows = await knex('tbl_abilities').select('*')

    for (var i = 0; i < rows.length; i ++) {
        abilities[rows[i].ability_id] = rows[i].manaCost
    }

    var rows = await knex('tbl_default_cards').select('*')

    for (var i = 0; i < rows.length; i ++) {
        var mana = 0

        mana += rows[i].health * manas['health']
        mana += rows[i].attack * manas['attack']
        mana += rows[i].defense * manas['defense']
        mana += rows[i].speed * manas['speed']

        var abs = JSON.parse(rows[i].ability)

        for (var j = 0; j < abs.length; j ++) {
            mana += abilities[abs[j]]
        }

        mana = Math.floor(mana * 10)

        var decimal = mana % 10

        mana = Math.floor(mana / 10.0)

        if (decimal >= 5) mana ++

        await knex('tbl_default_cards').where('card_id', rows[i].card_id).update({
            mana: mana
        })
    }


    // Set Abilities to Default Cards

    // await knex('tbl_default_cards').where('type', '!=', 1).update({
    //     ability: '[]'
    // })

    // var rows = await knex('tbl_default_cards').where('type', '!=', 1).select('*')
    // var abs = await knex('tbl_abilities').where('targetType', '!=', 1).select('*')

    // for (var i = 0; i < rows.length; i ++) {
    //     rows[i].ability = JSON.parse(rows[i].ability)
    // }

    // for (var i = 0; i < abs.length; i ++) {
    //     var cnt = abs[i].targetCount

    //     while (cnt) {
    //         var rand = Math.floor(Math.random() * (new Date().getTime())) % 82

    //         if (rows[rand].ability.indexOf(abs[i].ability_id) >= 0) continue
    //         if (rows[rand].ability.length == 2) continue
    //         if (rows[rand].ability.length == 1 && rows[rand].ability.indexOf(20) < 0 && abs[i].ability_id != 20) continue
    //         if (abs[i].targetType != 0 && abs[i].targetType != rows[rand].type) continue
            
    //         var targetQuery = abs[i].targetQuery.split(' ')

    //         if (targetQuery.length == 3) {
    //             var oper = targetQuery[1]

    //             if (oper == '<=' && rows[rand][targetQuery[0]] > targetQuery[2]) continue
    //             if (oper == '>=' && rows[rand][targetQuery[0]] < targetQuery[2]) continue
    //         }

    //         rows[rand].ability.push(abs[i].ability_id)
    //         cnt --
    //     }
    // }

    // for (var i = 0; i < rows.length; i ++) {
    //     await knex('tbl_default_cards').where('card_id', rows[i].card_id).update({
    //         ability: JSON.stringify(rows[i].ability)
    //     })
    // }
}

// init()