import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const URL = 'https://www.codewars.com/users/CodeYourFuture/following'

async function autoScroll(page: puppeteer.Page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const { scrollHeight } = document.body;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve(null);
        }
      }, 100);
    });
  });
}

export default async ():Promise<string[]> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.setViewport({ width: 1200,
    height: 800 });

  await autoScroll(page);
  const $ = cheerio.load(await page.content());
  const elmSelector = 'table > tbody > tr'
  const usernames:string[] = []
  $(elmSelector).each((_i, e) => {
    usernames.push($(e).data().username)
  })
  await browser.close();
  return usernames
};
