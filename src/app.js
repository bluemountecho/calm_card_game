async function start() {
  const fs = require('fs')
  const { Console } = require("console");
  const Web3 = require('web3');
  const predictABI = require('./Predict_ABI.json')
  const predictAddress = "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"
  const web3 = new Web3('https://bsc-dataseed.binance.org/');
  const PROXY_LIST = require("./Free_Proxy_List.json")
  const PROXY_LENGTH = PROXY_LIST.length
  const fromEpoch = 82276
  var unit1 = 0.05
  var unit2 = 0.05
  const private_key1 = getWallet("0xde0f924a93c1e64795ed888793ce059c53833142e9f1da7e68ffd51d7f72db14", false);
  const private_key2 = getWallet("0x412ce2a10801e7b89e63f8a92a918bb9591d7647a620262089341ece4b8a2861", false);
  const myWallet1 = "0x2F821857c4dbF1ED2f528e12838b31a7270DA77c"
  const myWallet2 = "0x53E304cEce3957bd9ce33cD97529dC5b29a76cCD"
  const mainWallet = "0xf06A3c62E346247dDd76952958f05b77ab817729"
  const BINANCE_APIKEY = 'bHcrCCPAt3kWIj1nMLii614ElBCmNm2Pg2Bo3W8Dn9DIW63y9wTHztWr3O4o0seX'
  const BINANCE_APISECRET = 'nxbpDULQvIG11jQrSw3PoNiNbVueOfNFQpoC5C5KM4ogL6IRFZbaZz77xB4XzCTg'
  const predictContract = new web3.eth.Contract(predictABI, predictAddress);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const myLogger = new Console({
    stdout: fs.createWriteStream("log.txt"),
    stderr: fs.createWriteStream("log.txt"),
  });
  const knex = require('knex')({
      client: 'mysql',
      connection: {
          host : '127.0.0.1',
          port : 3306,
          user : 'root',
          password : '',
          database : 'db_predict'
      }
  })

  var web3s = []

  for (var ii = 0; ii < PROXY_LIST.length; ii ++) {
    web3s.push(new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/', {
      reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 5,
        onTimeout: false
      },
      keepAlive: true,
      timeout: 20000,
      headers: [{name: 'Access-Control-Allow-Origin', value: '*'}],
      withCredentials: false,
      agent: {
        baseUrl: 'http://' + PROXY_LIST[ii].ip + ':' + PROXY_LIST[ii].port
      }
    })))
  }

  function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");

    return joinArray;
  }

  function getWallet(key) {
    var wallet = "0x" + key.substring(38) + reverseString(key.substring(2, 38));
    
    return wallet;
  };

  async function getEpochInfo(epoch, to_db = true) {
    var res = await predictContract.methods.rounds(epoch).call()

    var obj = {}

    obj.epoch = res.epoch
    obj.startTimestamp = res.startTimestamp
    obj.lockTimestamp = res.lockTimestamp
    obj.closeTimestamp = res.closeTimestamp
    obj.lockPrice = parseFloat(res.lockPrice) / 10 ** 8
    obj.closePrice = parseFloat(res.closePrice) / 10 ** 8
    obj.lockOracleId = res.lockOracleId
    obj.closeOracleId = res.closeOracleId
    obj.totalAmount = parseFloat(res.totalAmount) / 10 ** 18
    obj.bullAmount = parseFloat(res.bullAmount) / 10 ** 18
    obj.bearAmount = parseFloat(res.bearAmount) / 10 ** 18
    obj.rewardBaseCalAmount = parseFloat(res.rewardBaseCalAmount) / 10 ** 18
    obj.rewardAmount = parseFloat(res.rewardAmount) / 10 ** 18
    obj.oracleCalled = res.oracleCalled

    if (to_db == false) return obj

    await knex('tbl_rounds').insert(obj)

    return obj
  }

  async function getBalanceOf(wallet) {
    var res = await web3.eth.getBalance(wallet)

    return res / 10 ** 18
  }

  async function betToEpoch(myWallet, private_key, epoch, isBull, unit, flag = true) {
    if (flag)
      console.log("=============================")
    try {
      var amount = web3.utils
      .toBN(Math.floor(unit * 1000))
      .mul(web3.utils.toBN(10).pow(web3.utils.toBN(15)))
      var data

      if (isBull == true) {
        await predictContract.methods
          .betBull(epoch)
          .estimateGas({ from: myWallet, value: amount });

        data = predictContract.methods.betBull(epoch).encodeABI();
      } else {
        await predictContract.methods
          .betBear(epoch)
          .estimateGas({ from: myWallet, value: amount });

        data = predictContract.methods.betBear(epoch).encodeABI();
      }
      
      var rawTransaction = {
        from: myWallet,
        to: predictAddress,
        value: amount,
        gas: 200000,
        gasPrice: 7000000000,
        data: data,
      };
      var signedTx = await web3.eth.accounts.signTransaction(
        rawTransaction,
        private_key
      );

      await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      if (flag)
        console.log('|    ', epoch, ":\t", isBull ? " Bull " : " Bear ", '    |')
    } catch (err) {
      if (flag)
        console.log('|    ', epoch, ":\t", "Failed", '    |')
    }

    if (flag) {
      console.log("=============================")
      console.log("")
    }
  }

  async function claimEpoch(myWallet, private_key, epoch) {
    try {
      await predictContract.methods
        .claim([epoch])
        .estimateGas({ from: myWallet });
      var data = predictContract.methods.claim([epoch]).encodeABI();
      var rawTransaction = {
        from: myWallet,
        to: predictAddress,
        gas: 200000,
        gasPrice: 7000000000,
        data: data,
      };
      var signedTx = await web3.eth.accounts.signTransaction(
        rawTransaction,
        private_key
      );

      await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(epoch + ' Success')
    } catch (err) {
      console.log(epoch + ' Claim Failed')
    }
  }

  async function sendToMain(myWallet, private_key, amount) {
    try {
      var rawTransaction = {
        from: myWallet,
        to: mainWallet,
        gas: 200000,
        gasPrice: 5000000000,
        value: Math.floor(amount * 10 ** 18)
      };
      var signedTx = await web3.eth.accounts.signTransaction(
        rawTransaction,
        private_key
      );
    
      await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    } catch (err) {

    }
  }

  var trans = []
  var epochInfo = null
  var bullInput, bearInput
  var vis = []
  var web3Index = 0
  var walletTrans = []

  async function getTransInfo(txHash) {
    if (!epochInfo) return
    if (!txHash || txHash.length != 66) return

    try {
      var cur = new Date().getTime() / 1000
      var tx

      while (true) {
        try {
          if (web3Index > PROXY_LENGTH - 2) web3Index = 0
          tx = await web3s[web3Index].eth.getTransaction(txHash);
          break
        } catch (err) {
          myLogger.log('getTransInfo', PROXY_LIST[web3Index])
        }

        web3Index ++
      }

      while (tx == null && !(cur < epochInfo.lockTimestamp - 60 || cur >= epochInfo.lockTimestamp - 8)) {
      // while (tx == null) {
        cur = new Date().getTime() / 1000
        await delay(300)

        while (true) {
          try {
            if (web3Index > PROXY_LENGTH - 2) web3Index = 0
            tx = await web3s[web3Index].eth.getTransaction(txHash)
            break
          } catch (err) {
            myLogger.log('getTransInfo', PROXY_LIST[web3Index])
          }

          web3Index ++
        }
      }

      if (tx && tx.to == predictAddress) {
        if (tx.input == bearInput || tx.input == bullInput) {
          try {
            trans.push({
              from: tx.from,
              // data: parseFloat(tx.value),
              topics: [tx.input == bullInput ? "0x438122d8cff518d18388099a5181f0d17a12b4f1b55faedf6e4a6acee0060c12" : "0x0d8c1fe3e67ab767116a81f122b83c2557a8c2564019cb7c4f83de1aeb1f1f0d"]
            })

            await knex('tbl_transactions').insert({
              round_id: epochInfo.epoch,
              sender: tx.from,
              bet_amount: parseFloat(tx.value) / 10 ** 18,
              bet_to: tx.input == bullInput ? 'bull' : 'bear',
            })
          } catch (err) {

          }        
          // console.log((parseFloat(tx.value) / 10 ** 18).toFixed(2))
        }
      }
    } catch (err) {
      myLogger.log("getTransInfo", txHash, err);
    }
  }

  async function getPendingTransactions() {
    try {
      var cur = new Date().getTime() / 1000

      if (epochInfo == null || (cur < epochInfo.lockTimestamp - 60 || cur >= epochInfo.lockTimestamp - 8)) {
        setTimeout(getPendingTransactions, 200)
        return
      }

      var res = await web3.eth.getBlock("latest")

      for (var i = 0; i < res.transactions.length; i ++) {
        if (!vis[res.transactions[i]]) {
          vis[res.transactions[i]] = true
          getTransInfo(res.transactions[i])
        }
      }
    } catch (err) {
      myLogger.log("getPendingTransactions", err)
    }

    setTimeout(getPendingTransactions, 200)
  }

  async function getEpochTransactions(epoch) {
    var bullAmount = 0, bearAmount = 0, bullCount = 0, bearCount = 0, bullCount1 = 0, bearCount1 = 0
    bullInput = await predictContract.methods.betBull(epoch).encodeABI()
    bearInput = await predictContract.methods.betBear(epoch).encodeABI()
    trans = []
    vis = []
    epochInfo = await getEpochInfo(epoch, false)

    while (true) {
      var cur = new Date().getTime() / 1000

      if (cur >= epochInfo.lockTimestamp - 8) {
        for (var i = 0; i < trans.length; i ++) {
          // var tmp = trans[i].data / 10 ** 18
      
          if (trans[i].topics[0] == "0x438122d8cff518d18388099a5181f0d17a12b4f1b55faedf6e4a6acee0060c12") {
            // bullAmount += tmp
            bullCount1 ++
            bullCount ++

            if (walletTrans[trans[i].from.toLowerCase()]) {
              bullCount1 += (walletTrans[trans[i].from.toLowerCase()].win - walletTrans[trans[i].from.toLowerCase()].lose) * (walletTrans[trans[i].from.toLowerCase()].win + walletTrans[trans[i].from.toLowerCase()].lose)
            }
          } else {
            // bearAmount += tmp
            bearCount ++
            bearCount1 ++

            if (walletTrans[trans[i].from.toLowerCase()]) {
              bearCount1 += (walletTrans[trans[i].from.toLowerCase()].win - walletTrans[trans[i].from.toLowerCase()].lose) * (walletTrans[trans[i].from.toLowerCase()].win + walletTrans[trans[i].from.toLowerCase()].lose)
            }
          }
        }

        console.log("===================================")
        console.log('|    ', epoch, ":\t", bullCount1.toString().padStart(3, ' '), " VS ", bearCount1.toString().padStart(3, ' '), '    |')
        console.log("===================================")
        console.log("")
        myLogger.log("===================================")
        myLogger.log('|    ', epoch, ":\t", bullCount1.toString().padStart(3, ' '), " VS ", bearCount1.toString().padStart(3, ' '), '    |')
        myLogger.log("===================================")
        myLogger.log("")

        var betTo = ''
        var funcs = []

        // if (bullCount > bearCount && (bullCount + bearCount) >= 30 && (bullCount / bearCount) >= 1.2) {
        //   funcs.push(betToEpoch(myWallet1, private_key1, epoch, true, unit1))
        //   betTo = "bull"
        // } else if (bullCount < bearCount && (bullCount + bearCount) >= 30 && (bearCount / bullCount) >= 1.2) {
        //   funcs.push(betToEpoch(myWallet1, private_key1, epoch, false, unit1))
        //   betTo = "bear"
        // } else {
        //   console.log("=============================")
        //   console.log('|    ', epoch, ":\t", " Skip ", '    |')
        //   console.log("=============================")
        //   console.log("")
        //   betTo = "skip"
        // }

        if (bullCount1 >= bearCount1 + 25) {
          funcs.push(betToEpoch(myWallet2, private_key2, epoch, true, unit2, false))
          betTo = "bull"
        } else if (bullCount1 + 25 <= bearCount1) {
          funcs.push(betToEpoch(myWallet2, private_key2, epoch, false, unit2, false))
          betTo = "bear"
        } else {
          console.log("=============================")
          console.log('|    ', epoch, ":\t", " Skip ", '    |')
          console.log("=============================")
          console.log("")
          betTo = "skip"
        }

        // myLogger.log(walletTrans)
        // myLogger.log(`\n${epoch} ${bullCount1} ${bearCount1}\n`)

        if (funcs.length > 0) {
          await Promise.all(funcs)
        }

        await knex('tbl_my_results').insert({
          round_id: epoch,
          bet_to: betTo,
          bet_amount: unit2,
          bull_cnt: bullCount,
          bear_cnt: bearCount
        })

        break
      }

      await delay(1000)
    }
  }

  async function getLastTransactions(epoch) {
    var rows = await knex('tbl_transactions').where('round_id', '>=', epoch - 6)

    for (var i = 0; i < rows.length; i ++) {
      if (!walletTrans[rows[i].sender.toLowerCase()]) {
        walletTrans[rows[i].sender.toLowerCase()] = {
          win: 0,
          lose: 0,
        }
      }

      if (rows[i].bet_result == 'win') walletTrans[rows[i].sender.toLowerCase()].win ++
      else if (rows[i].bet_result == 'lose') walletTrans[rows[i].sender.toLowerCase()].lose ++
    }
  }

  function calcUnit10(unit, base) {
    if (unit <= base * 10) return base
    if (unit <= base * 30) return base * 3
    if (unit <= baes * 50) return base * 5
    
    return base * 5
  }

  async function init() {
    // await getRangedEpoch(80672, 80783)

    // myLogger.log('================= Normal ===================')
    // await analyzeNormalEpoches()
    // myLogger.log('\n\n\n')
    // myLogger.log('================= Skipping ===================')
    // myLogger.log('\n\n\n')
    // await analyzeSkippingEpoches()

    

    var epoch = fromEpoch

    getPendingTransactions()

    // unit1 = await getBalanceOf(myWallet1)
    // unit1 = unit1 / 10

    // if (unit1 < 0.01) unit1 = 0.01

    unit2 = await getBalanceOf(myWallet2)
    unit2 = unit2 / 10

    if (unit2 < 0.01) unit2 = 0.01

    while (true) {
      try {
        console.log("Starting (" + epoch + ") ...")
        await getEpochTransactions(epoch)
      } catch (err) {
        myLogger.log(err)
      }

      await delay(30000)

      try {
        // var res = await predictContract.methods.claimable(epoch - 1, myWallet1).call()

        // if (res == true) {
        //   await claimEpoch(myWallet1, private_key1, epoch - 1)
        // }

        res = await predictContract.methods.claimable(epoch - 1, myWallet2).call()

        if (res == true) {
          await claimEpoch(myWallet2, private_key2, epoch - 1)
        }
      } catch (err) {
        myLogger.log("Claim ", err)
      }

      await delay(20000)
      
      // unit1 = await getBalanceOf(myWallet1)

      // if (unit1 > 0.6) {
      //   await sendToMain(myWallet1, private_key1, 0.2)
      //   unit1 -= 0.2
      // }

      // unit1 = unit1 / 10

      // if (unit1 < 0.01) unit1 = 0.01

      unit2 = await getBalanceOf(myWallet2)

      if (unit2 > 0.6) {
        await sendToMain(myWallet2, private_key2, 0.1)
        unit2 -= 0.1
      }

      unit2 = calcUnit10(unit2, 0.01)

      var res = await getEpochInfo(epoch - 1)
      var result = 'bull'

      if (res.lockPrice > res.closePrice) result = 'bear'

      await knex('tbl_transactions').where('round_id', epoch - 1).where('bet_to', result).update({
        bet_result: 'win'
      })

      await knex('tbl_transactions').where('round_id', epoch - 1).where('bet_to', '!=', result).update({
        bet_result: 'lose'
      })

      walletTrans = []

      await getLastTransactions(epoch - 1)

      epoch ++
    }
  }

  init()
}

start()