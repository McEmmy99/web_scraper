//This is file contains script that starts the browser

const puppeteer = require('puppeteer');


//This function will start the browser and return an instance of it
async function startBrowser() {
    let browser;
    try {
        console.log("Opening the browser........");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}





module.exports = {
    startBrowser
};