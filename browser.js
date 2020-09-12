const puppeteer = require("puppeteer");

async function startBrowser() {
  let browser;
  try {
    console.log("opening browser...");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
      devtools: true,
    });
  } catch (err) {
    console.log(`Couldn't create browser instances => ${err}`);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
