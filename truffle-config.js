var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: 'R4K13CYVKV7TAQ3CRGBV8PBBR4RARY6EEC'
  },
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider('f59ecbb30863b2d44eb9736241453f1c4adc71371af577dfb5e532d153671b11', 'https://data-seed-prebsc-1-s1.binance.org:8545/'),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0xbf96178161586b8C9c5096E35Ac2EA2Ad1fAd2A7',
      networkCheckTimeout: 1000000
    },
    bsc: {
      provider: () => new HDWalletProvider('f59ecbb30863b2d44eb9736241453f1c4adc71371af577dfb5e532d153671b11', `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0xbf96178161586b8C9c5096E35Ac2EA2Ad1fAd2A7'
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    //timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9", // A version or constraint - Ex. "^0.5.0"
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}