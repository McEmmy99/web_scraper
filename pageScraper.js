// The actual scraping is done here

const scraperObject = {
    url: 'http://books.toscrape.com',
    async scraper(browser){
        //.newPage() creates a new page instance in the browser instance
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        //.goto() navigates to the url homepage
        await page.goto(this.url);
    }
}

//The whole object is exported. 
//Remember that the scraper() method was used in pageController.js

module.exports = scraperObject;