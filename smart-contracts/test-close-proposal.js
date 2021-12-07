const { NodeVM } = require('vm2')
const fs = require('fs')

;(async () => {
  try {
    const HORIZON_URL = 'https://horizon-testnet.stellar.org'
    const STELLAR_NETWORK = 'TESTNET'

    const vm = new NodeVM({
      // console: 'off',
      eval: false,
      wasm: false,
      strict: true,
      fixAsync: true,
      sandbox: {
        HORIZON_URL,
        STELLAR_NETWORK,
        window: {}
      },
      require: {
        builtin: ['util'],
        external: {
          modules: ['bignumber.js', 'node-fetch', 'stellar-sdk', 'lodash', 'sha']
        },
        context: 'host',
      }
    })

    const txFunctionCode = fs.readFileSync('./dist/txFunction.js', 'utf8')
    const result = await vm.run(txFunctionCode, 'vm.js')({
       action: 'close',
       source: 'GDAWI5ID5QDM26GVEWNT2SLG4OBUFWHCOJ6BEVSPWLQLWFFRTOT3AGUG', // SBLWS3VCF5DZKGZEHRWD3SABAILWNNZGMKSUSMLQ4YFGY5BL6LP2GKVL
       proposalAccountId: 'GB54Q2356PWKIXGNTWA4TMC5U2FCUJVVOR2VG7FHSUU4X7VEITTC6NON'
    })
  
    console.log(result)
  }

  catch(err) {
    console.error(err)
  }
})()
