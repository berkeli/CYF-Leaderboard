import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';

const URL = 'https://www.codewars.com/users/CodeYourFuture/authored_collections'

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
          resolve();
        }
      }, 100);
    });
  });
}

export default async ():Promise<{_id: mongoose.Types.ObjectId, name: string}[]> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.setViewport({ width: 1200,
    height: 800 });

  await autoScroll(page);
  const $ = cheerio.load(await page.content());
  const elmSelector = '.list-item-collection'
  const collectionIds:{_id: mongoose.Types.ObjectId, name: string}[] = []
  $(elmSelector).each((i, e) => {
    collectionIds.push({ _id: new mongoose.Types.ObjectId(e.attribs.id), name: e.attribs['data-title'] });
  })
  await browser.close();
  return collectionIds
};
