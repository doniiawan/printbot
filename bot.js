const axios = require('axios')
const sleep = require('sleep')


async function mainLoop() {
    while (true) {
        sleep.sleep(1)
        const res = await getUpdates()
        console.log(res.result[0])
    }
}

// Return listing data from API
async function getUpdates(page) {
    try {
        const response = await axios.get('https://api.telegram.org/bot5392981548:AAFWeADvdeenC_br8ZlWD7mmeNCSDyzZRss/getUpdates');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

mainLoop();