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
          modules: ['bignumber.js', 'node-fetch', 'stellar-sdk', 'lodash']
        },
        context: 'host',
      }
    })

    const txFunctionCode = fs.readFileSync('./dist/txFunctionCreateProposal.js', 'utf8')
    const result = await vm.run(txFunctionCode, 'vm.js')({
      daoToml: 'https://turretsdao.org/.well-known/dao.toml',
      source: 'GCWTAL5IJ557PR3JXZ7D4PJ67G5H2TN7NP6PHYRZWUA4LYFDTSOFVXNO', // SC6DAWE7LIA7PVKI57P4LZOP5WUKGD7RW36AKBU3KLFSMWRLQOGKMIK3
      proposalSecret: 'SCUZX2S5VEZFFW7CHNMQTDMTULW6HU6GTZML7MYLNUICUG2D7TOLM3UY',
      tallySecret: 'SBGAX2GCDNFO4OVH4LWNUO4PVHJ6C2M6HKYRGTWDLEYFCUXKYBJDSJAM',
      tallyContractSigners:'',
      IpfsProposalAddr: ''
    })
  
    console.log(result)
  }

  catch(err) {
    console.error(err)
  }
})()