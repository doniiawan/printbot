const { Telegraf } = require('telegraf')
const axios = require('axios')
const fs = require('fs')
const { print } = require('unix-print')

const bot = new Telegraf('5392981548:AAFWeADvdeenC_br8ZlWD7mmeNCSDyzZRss')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.on('message', async (ctx) => {
  const files = ctx.update.message.document
  console.log(files)
  const fileLink = await getFileLinks(files.file_id)
  console.log(fileLink)
  const downloadedFile = await downloadFile(fileLink, files.file_unique_id)
  console.log(downloadedFile)
//   const printQueue = await printFile(files.file_unique_id)
})
bot.launch()

async function getFileLinks(fileId) {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot5392981548:AAFWeADvdeenC_br8ZlWD7mmeNCSDyzZRss/getFile?file_id=${fileId}`
    )
    return response.data.result.file_path
  } catch (error) {
    console.error(error)
  }
}

async function downloadFile(filePath, fileId) {
  try {
    axios({
      method: 'get',
      url: `https://api.telegram.org/file/bot5392981548:AAFWeADvdeenC_br8ZlWD7mmeNCSDyzZRss/${filePath}`,
      responseType: 'stream',
    }).then(function (response) {
      response.data.pipe(fs.createWriteStream(`downloads/${fileId}.pdf`))
    })
  } catch (error) {
    console.log(error)
  }
}

async function printFile(fileId) {
  print(`downloads/${fileId}.pdf`).then(console.log)
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
