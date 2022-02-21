var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : '',
        database : 'db_angel_and_demon'
    }
})

server = app.listen(80, () => {
    console.log('Server started at http://167.86.120.197')
})

io = socketIO(server, {
    cors: {
        origin: "*"
    }
})

io.on('connection', function (socket) {
    socket.on('set-player-name', async (data) => {
        socket.address = data.address
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

            return 0
        })
        await knex('tbl_users').where('address', data.address).update({
            decks: JSON.stringify(data.data)
        })

        socket.emit('deck-list-saved', 'Deck list is saved successfully!')
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
                rows[0].isFinished = 1
            }
        }

        rows[0].player1 = JSON.stringify(rows[0].player1)
        rows[0].player2 = JSON.stringify(rows[0].player2)
        await knex('tbl_battles').where('battle_id', rows[0].battle_id).update(rows[0])        
        socket.broadcast.emit('battle-info-updated', true)
        socket.emit('battle-info-updated', true)
    })
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/getDefaultCards', async (req, res, next) => {
    var rows = await knex('tbl_default_cards').select('*')
    var data = []

    data[0] = []
    data[1] = []
    data[2] = []

    for (var i = 0; i < rows.length; i ++) {
        data[rows[i].card_type].push(rows[i])
    }

    res.send(data)
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


// async function init() {
//     for (var i = 1; i <= 38; i ++) {
//         await knex('tbl_default_cards').insert({
//             card_name: "Monster" + i,
//             card_type: 0,
//             card_description: "This is monster card.",
//             card_image: "card" + (i % 17) + ".png",
//             attack_point: 20 + i % 10,
//             defense_point: 20 - i % 10,
//             mana_point: Math.floor(i / 10 + 1)
//         })
//     }
      
//     for (var i = 1; i <= 51; i ++) {
//         await knex('tbl_default_cards').insert({
//             card_name: "Spell" + i,
//             card_type: 1,
//             card_description: "This is spell card.",
//             card_image: "card" + (i % 17) + ".png",
//             attack_point: 20 + i % 10,
//             defense_point: 20 - i % 10,
//             mana_point: Math.floor(i / 10 + 1)
//         })
//     }
      
//     for (var i = 1; i <= 33; i ++) {
//         await knex('tbl_default_cards').insert({
//             card_name: "Equip" + i,
//             card_type: 2,
//             card_description: "This is equip card.",
//             card_image: "card" + (i % 17) + ".png",
//             attack_point: 20 + i % 10,
//             defense_point: 20 - i % 10,
//             mana_point: Math.floor(i / 10 + 1)
//         })
//     }
// }

// init()