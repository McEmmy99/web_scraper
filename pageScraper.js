// The actual scraping is done here

const scraperObject = {
    url: 'http://books.toscrape.com',
    async scraper(browser){
        //.newPage() creates a new page instance in the browser instance
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        //.goto() navigates to the url homepage
        await page.goto(this.url);
        //Wait for the required DOM to be rendered
        await page.waitForSelector('.page_inner');
        //Get the link to all the required books
        //Be sure to only reurn a string or number with .$$eval() or .$eval() methods
        let urls = await page.$$eval('section ol > li', links => {
            //Make sure the book to be scrapped is in stock
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
            //Extract the links from the data
            links = links.map(el => el.querySelector('h3 > a').href)
            return links;
        });
        console.log(urls);
    }
}

//The whole object is exported. 
//Remember that the scraper() method was used in pageController.js

module.exports = scraperObject;