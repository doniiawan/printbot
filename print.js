const { print,getPrinters,getDefaultPrinter } = require('unix-print')
// print(`downloads/AgADtgUAAm5aSVc.pdf`).then(console.log)

// getPrinters().then(console.log)
getDefaultPrinter().then(console.log);