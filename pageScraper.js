function removePlural(str) {
  if (str.includes(' ')) return str;
  const regex = RegExp(/[A-Za-z]*s/g)
  return regex.test(str) ? str.slice(0, str.length - 1) : str;
}

const scraperObject = {
  async scraper(browser, uri) {

    const FoodTypes = [];

    let page = await browser.newPage();
    console.log(`Navigating to ${uri}...`);
    // Navigate to the selected page
    await page.goto(uri);


    await page.waitForSelector(`li[itemprop="item"]`);
    const urls = await page.$$eval('li[itemprop="item"]>div.vdo_img_cont>a', links => {
      return links.map(x => x.href);

    })

    let pagePromise = link => new Promise(async (resolve, reject) => {
      let type = '';
      let newPage = await browser.newPage();

      await newPage.goto(link);

      const items = await newPage.$$eval('span[itemprop="name"]', items => {

        return items.map(i => i.textContent);
      });

      type = await newPage.$eval('h1[itemprop="name"]', (header => header.textContent));


      resolve(items.map(i => ({ name: i, type: removePlural(type) })));

    })

    return Promise.all(urls.map(async link => await pagePromise(link)));
  },
};

module.exports = scraperObject;
