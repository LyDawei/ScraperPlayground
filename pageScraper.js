
const scraperObject = {
  async scraper(browser, uri) {
    let page = await browser.newPage();
    console.log(`Navigating to ${uri}...`);
    // Navigate to the selected page
    await page.goto(uri);

    await page.waitForSelector("ul>li");
    const diets = await page.$$eval("li", (links) => {
      const diets = links.filter(
        (x) => !x.className && !x.id && x.textContent.includes("diet")
      );

      return diets.map((d, i) => {
        return {
          name: d.textContent.substring(0, d.textContent.indexOf(": ")),
          description: d.textContent.replace(/\[[0-9]*\]/g, ""),
        };
      });
    });
  },
};

module.exports = scraperObject;
