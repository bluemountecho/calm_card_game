import $ from "jquery"
import Web3 from "web3";
import AngelAndDemonGame from '../../build/contracts/AngelAndDemonGame.json'
import GodsNLegends from '../../build/contracts/GodsNLegends.json'
import {monsterCards, spellCards, equipCards} from '../../src/cardInfos/config'

var web3 = null
var ANDContract = null
var GNLRContract = null
var targetAddress = '0x37Fb35101173f5cc996503FF9ad859A396920a3d'
var targetAmount = 100

export const connect = async function(onConnected = null, onCancelled = null) {
    try {
        if (!window.ethereum) {
            alert("Get MetaMask!");
            return;
        }

        if (web3 == null || ANDContract == null) {
            web3 = new Web3(window.ethereum)
            ANDContract = new web3.eth.Contract(
                AngelAndDemonGame.abi,
                "0x98293b56b5EBb651A37832521ec2e94611f1b76f"
            )
            GNLRContract = new web3.eth.Contract(
                GodsNLegends.abi,
                "0xf118D4F62781F8c7CE024D66e037D9a843aa928d"
            )
        }

        var res = await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x61" }]
        });

        var accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length > 0) {
            window.document.querySelector('#signIn').innerHTML = ('Sign In<br/>(' + accounts[0].substring(0, 5) + '...' + accounts[0].substring(accounts[0].length - 4) + ')')

            if (onConnected != null) {
                onConnected(accounts[0])
            }
            return
        }
    
        accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        if (accounts.length > 0) {
            window.document.querySelector('#signIn').innerHTML = ('Sign In<br/>(' + accounts[0].substring(0, 5) + '...' + accounts[0].substring(accounts[0].length - 4) + ')')
        
            if (onConnected != null) {
                onConnected(accounts[0])
            }
            return
        }

        if (onCancelled) onCancelled()
        window.document.querySelector('#signIn').innerHTML = ('Sign In')
    } catch (err) {
        try {
            window.document.querySelector('#signIn').innerHTML = ('Sign In')
        } catch (err) {
        }
        
        if (onCancelled) onCancelled()
    }    
}

export const getPlayerName = async function(address) {
    if (ANDContract) {
        return await ANDContract.methods.getPlayerName(address).call()
    }

    return ""
}

export const setPlayerName = async function(address, name, confirm = () => {}, reject = () => {}) {
    ANDContract.methods.setPlayerName(name).send({from: address})
    .on('confirmation', function (confirmationNumber, receipent) {
        confirm()
    })
    .on('error', function (error, receipent) {
        reject()
    })
}

export const addCardsToPlayer = async function(address, callback = () => {}, reject = () => {}) {
    var monsters = []
    var monsterURLs = []
    var spells = []
    var spellURLs = []
    var equips = []
    var equipURLs = []

    for (var i = 0; i < monsterCards.length; i ++) {
        monsters.push([
            monsterCards[i].AttackPoint,
            monsterCards[i].DefensePoint,
            monsterCards[i].ManaCost
        ])

        monsterURLs.push(monsterCards[i].Card)
    }

    for (var i = 0; i < spellCards.length; i ++) {
        spells.push([
            spellCards[i].AttackPoint,
            spellCards[i].DefensePoint,
            spellCards[i].ManaCost
        ])

        spellURLs.push(spellCards[i].Card)
    }

    for (var i = 0; i < equipCards.length; i ++) {
        equips.push([
            equipCards[i].AttackPoint,
            equipCards[i].DefensePoint,
            equipCards[i].ManaCost
        ])

        equipURLs.push(equipCards[i].Card)
    }
    
    ANDContract.methods.addCardsToPlayer(
        web3.eth.abi.encodeParameters([
            'uint',
            'tuple(uint, uint, uint)[]',
            'string[]',
            'uint',
            'tuple(uint, uint, uint)[]',
            'string[]',
            'uint',
            'tuple(uint, uint, uint)[]',
            'string[]'
        ], [
            monsterCards.length,
            monsters,
            monsterURLs,
            spellCards.length,
            spells,
            spellURLs,
            equipCards.length,
            equips,
            equipURLs
        ])
    ).send({from: address})
    .on('confirmation', function (confirmationNumber, receipent) {
        callback()
    })
    .on('error', function (error, receipent) {
        reject()
    })
}

export const getCardsOfPlayer = async function(address) {
    var res = await ANDContract.methods.getCardsOfPlayer(address).call()

    return web3.eth.abi.decodeParameters(
        [
            'tuple(uint, uint, uint)[]',
            'string[]',
            'uint[]',
            'tuple(uint, uint, uint)[]',
            'string[]',
            'uint[]',
            'tuple(uint, uint, uint)[]',
            'string[]',
            'uint[]',
        ],
        res
    )
}

export const addCardsToDeck = async function(address, cardIDs, callback = () => {}, reject = () => {}) {
    ANDContract.methods.addCardsToDeck(cardIDs).send({from: address})
    .on('confirmation', function (confirmationNumber, receipent) {
        callback()
    })
    .on('error', function (error, receipent) {
        reject()
    })
}

export const getCardsFromDeck = async function(address) {
    var res = await ANDContract.methods.getCardsFromDeck(address).call()

    return web3.eth.abi.decodeParameter('uint[]', res)
}

export const findBattle = async function(address, callback = () => {}, reject = () => {}) {
    ANDContract.methods.findBattle().send({from: address})
    .on('confirmation', function (confirmationNumber, receipent) {
        callback()
    })
    .on('error', function (error, receipent) {
        reject()
    })
}

export const getBattle = async function (address) {
    var res = await ANDContract.methods.getBattle(address).call()

    return res
}

export const updateBattle = async function (address, battle, callback = () => {}, reject = () => {}) {
    var isPlayer1 = 0

    if (address.toLowerCase() == battle[1][0].toLowerCase()) {
        isPlayer1 = 1
    }

    console.log(address, battle, isPlayer1)

    ANDContract.methods.updateBattle(battle, isPlayer1).send({from: address})
    .on('confirmation', function (confirmationNumber, receipent) {
        callback()
    })
    .on('error', function (error, receipent) {
        reject()
    })
}

export const endTurn = async function (address, callback = () => {}, reject = () => {}) {
    ANDContract.methods.endTurn().send({from: address})
    .on('confirmation', function (confirmationNumber, receipent) {
        callback()
    })
    .on('error', function (error, receipent) {
        reject()
    })
}

export const transferPlayFee = async function (address, callback = () => {}, reject = () => {}) {
    GNLRContract.methods.transfer(targetAddress, '100000000000000000000').send({from: address})
    .on('confirmation', function (confirmationNumber, receipent) {
        if (confirmationNumber == 0) callback()
    })
    .on('error', function (error, receipent) {
        reject()
    })
}