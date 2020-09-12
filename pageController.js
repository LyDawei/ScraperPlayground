const pageScraper = require("./pageScraper");
async function scrapeAll(browserInstance, uri) {
  let browser;
  try {
    browser = await browserInstance;
    return await pageScraper.scraper(browser, uri);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance, uri) => scrapeAll(browserInstance, uri);
