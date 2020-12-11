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

        //Loop through each of the links, open a new page instance and get the relevant data from the,
         let pagePromise = (link) => new Promise(async(resolve, reject) => {
            //An empty object that will conatain the needed data 
            let dataObj = {};
             let newPage = await browser.newPage();
             console.log(`Navigating to ${link}...`);
             //Open individual links as it is being interated on
             await newPage.goto(link);
             //Start populating the dataObj{} object.
             dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
             dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
             dataObj['noAvailable'] = await newPage.$eval('.instock.availability', text => {
                 //Strip new line and tab spaces
                 text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
                 //Get the number of stock avvailable
                 //To extract only the number of stock from "In stock (19 available)"
                 let regexp = /^.*\((.*)\).*$/i;
                 let stockAvailable = regexp.exec(text)[1].split(' ')[0];
                 return stockAvailable;
             });
             dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => img.src);
             dataObj['bookDescription'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
             dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
             resolve(dataObj);
             //Close each page every time it has scraped the needed data, then open another page in the next loop
             await newPage.close();
         });

         for(link in urls){
             let currentPageData = await pagePromise(urls[link]);
             console.log(currentPageData);
         }
    }
}

//The whole object is exported. 
//Remember that the scraper() method was used in pageController.js

module.exports = scraperObject;