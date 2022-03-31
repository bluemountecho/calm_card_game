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

app.use(cors())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

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
        var winner, befPlayer = 2

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

            // battleLog[0].push([])
            // stateLog[0].push([])
            
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

            // battleLog[0].push([])
            // stateLog[0].push([])
        }

        async function calcBattleRound(roundIndex) {
            battleLog[roundIndex] = []
            stateLog[roundIndex] = []

            var log = battleLog[roundIndex]
            var state = stateLog[roundIndex]
            var vis = []

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

                var missed = false
                // var totalSpeed = friendDeck[curPosition].speed + enemyDeck[targetPosition].speed

                // if (Math.random() < friendDeck[targetPosition].speed / totalSpeed / 2.0) missed = true

                if (friendDeck[curPosition].speed < enemyDeck[targetPosition].speed) {
                    var diff = enemyDeck[targetPosition].speed - friendDeck[curPosition].speed

                    if (Math.random() < diff * 0.15) missed = true
                }

                if (missed == false) {
                    if ((friendDeck[curPosition].type == 2 || friendDeck[curPosition].type == 3) && (enemyDeck[targetPosition].defense > 0)) {
                        log.push([{
                            Type: 'Blood',
                            Self: targetID,
                            Player: targetPlayer,
                            Position: targetPosition
                        }, {
                            Type: 'ChangeDefense',
                            Text: -friendDeck[curPosition].attack,
                            Player: targetPlayer,
                            Self: targetID,
                            NotShowGif: true,
                        }])

                        enemyDeck[targetPosition].defense -= friendDeck[curPosition].attack
                        
                        if (enemyDeck[targetPosition].defense < 0) enemyDeck[targetPosition].defense = 0

                        state.push([{
                            Type: 'defense',
                            Amount: -friendDeck[curPosition].attack,
                            Value: enemyDeck[targetPosition].defense,
                            Player: targetPlayer,
                            Self: targetID,
                            Position: targetPosition
                        }])
                    } else {
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
                    }
                } else {
                    log.push([{
                        Type: 'Missed',
                        Self: targetID,
                        Player: targetPlayer,
                        Position: targetPosition
                    }])
                    state.push([])
                }

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
                    
                    if (enemyDeck.length == 1) {
                        if (curPlayer == 1) winner = battle.player1Address
                        else winner = battle.player2Address

                        log.push([{
                            Type: 'Winner',
                            Player: curPlayer,
                            Address: winner
                        }])
                        state.push([])

                        await TransferToWinner(winner)

                        return true
                    }
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

        await knex('tbl_battles').where('battle_id', battleID).delete()

        return (await knex('tbl_battle_history').insert({
            player1Address: battle.player1Address,
            player2Address: battle.player2Address,
            player1Deck: battle.player1Deck,
            player2Deck: battle.player2Deck,
            battleLog: JSON.stringify(battleLog),
            stateLog: JSON.stringify(stateLog),
            winner: winner,
            finishedAt: convertTimestampToString(new Date().getTime(), true),
            battle_id: battleID
        }))[0]
    }

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

    app.get('/getPlayerName/:address', async (req, res, next) => {
        var address = req.params.address.toLowerCase()
        var rows = await knex('tbl_users').where('address', address).select('*')
        var username = ""

        if (rows.length) {
            username = rows[0].username
        }
        
        res.send(username)
    })

    app.get('/findBattle/:address/:timeRemain', async (req, res, next) => {
        var address = req.params.address
        var timeRemain = req.params.timeRemain

        await knex('tbl_battles').where('player2Address', '').where('createdAt', '<', convertTimestampToString(new Date().getTime() - 120 * 1000, true)).delete()
        await knex('tbl_battles').where('acceptedAt', '!=', '').where('acceptedAt', '<', convertTimestampToString(new Date().getTime() - 60 * 1000, true)).where('isAccepted', '!=', 3).delete()

        var rows = await knex('tbl_battles').where('startedAt', '!=', '').where('startedAt', '<', convertTimestampToString(new Date().getTime() - 180 * 1000, true)).where('isStarted', '!=', 3).select('*')

        for (var i = 0; i < rows.length; i ++) {
            if (rows[i].isStarted == 0) continue
            if (rows[i].isStarted == 1) {
                await knex('tbl_battle_history').insert({
                    player1Address: rows[i].player1Address,
                    player2Address: rows[i].player2Address,
                    player1Deck: rows[i].player1Deck,
                    player2Deck: rows[i].player2Deck,
                    battleLog: '[]',
                    stateLog: '[]',
                    winner: player1Address,
                    finishedAt: convertTimestampToString(new Date().getTime(), true),
                })
            } else {
                await knex('tbl_battle_history').insert({
                    player1Address: rows[i].player1Address,
                    player2Address: rows[i].player2Address,
                    player1Deck: rows[i].player1Deck,
                    player2Deck: rows[i].player2Deck,
                    battleLog: '[]',
                    stateLog: '[]',
                    winner: player2Address,
                    finishedAt: convertTimestampToString(new Date().getTime(), true),
                })
            }
        }

        await knex('tbl_battles').where('startedAt', '!=', '').where('startedAt', '<', convertTimestampToString(new Date().getTime() - 180 * 1000, true)).where('isStarted', '!=', 3).delete()

        rows = await knex('tbl_battles').where('player1Address', address).orWhere('player2Address', address)

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

    app.get('/getBattle/:address', async (req, res, next) => {
        var address = req.params.address
        var rows = await knex('tbl_battles').where('player1Address', address).orWhere('player2Address', address).select('*')
        
        res.send(rows)
    })

    app.get('/getBattleHistory/:battleID', async (req, res, next) => {
        var battleID = req.params.battleID
        var rows = await knex('tbl_battle_history').where('battle_id', battleID).select('*')
        
        res.send(rows)
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
            var result = await calcBattle(battleID)

            res.send({
                message: 'done',
                data: result
            })
        } else {
            res.send({
                message: 'wait',
                data: battleID
            })
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

    app.post('/getBattleHistory', async (req, res, next) => {
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