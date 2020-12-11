//Controls the scraping process
//Takes browser instance passed to it from index.js
// and passes it ot pageScrapper.js where the scraping scripts is executed

const pageScraper = require('./pageScraper');
const fs = require('fs');
async function scrapeAll(browserInstance) {
    let browser;
    try{
        browser = await browserInstance;
        //Implementing scraping by category
        let scrapedData = {};
        // Call the scraper for different set of books to be scraped
        //Here, the browserInstance and the category is then passed to the scraper() method in pageScraper.js
        scrapedData['Travel'] = await pageScraper.scraper(browser, 'Travel');
        scrapedData['HistoricalFiction'] = await pageScraper.scraper(browser, 'Historical Fiction');
        scrapedData['Mystery'] = await pageScraper.scraper(browser, 'Mystery');
        await browser.close();
        fs.writeFile("data.json", JSON.stringify(scrapedData), 'utf8', function(err){
            if(err){
                return console.log(err);
            }
            console.log("The data has been scraped and saved successfully! View it at '/.data.json'");
        });
        // console.log(scrapedData)
        // await pageScraper.scraper(browser);
    }
    catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}


//Export the scrapeAll() function to receive browserInstance from index.js
module.exports = (browserInstance) => scrapeAll(browserInstance);

