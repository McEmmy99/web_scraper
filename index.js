// require browser.js and pageController.js
// call startBrowser() from browser.js and
//pass the created browser instance to pageController.js


const browserObject = require('./browser');
//a function expecting browserInstance as a parameter
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

//Pass the browser instance to the scraper controller
scraperController(browserInstance)