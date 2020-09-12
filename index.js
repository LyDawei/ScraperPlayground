const browserObject = require('./browser');
const scraperController = require('./pageController');

//const uri = 'https://en.wikipedia.org/wiki/List_of_diets';
const uri = 'https://food.ndtv.com/ingredient/';

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance, uri).then(data => {
    console.log(data);
})

//TODO: Write data into storage location...