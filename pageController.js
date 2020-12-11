//Controls the scraping process
//Takes browser instance passed to it from index.js
// and passes it ot pageScrapper.js where the scraping scripts is executed

const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance) {
    let browser;
    try{
        browser = await browserInstance;
        //Here, the browserInstance is then passed to the scraper() method in pageScraper.js
        await pageScraper.scraper(browser);
    }
    catch (err) {
        console.log("COuld not resolve the browser instance => ", err);
    }
}


//Export the scrapeAll() function to receive browserInstance from index.js
module.exports = (browserInstance) => scrapeAll(browserInstance);

