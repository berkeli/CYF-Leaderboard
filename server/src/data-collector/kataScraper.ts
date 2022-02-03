import { UserModel as User } from './../entities/user';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';

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

export default async (collectionID:string):Promise<{description: string | null, katas:object[]}> => {
  const URL = `https://www.codewars.com/collections/${collectionID}`
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.setViewport({ width: 1200,
    height: 800 });

//   await autoScroll(page);
  const $ = cheerio.load(await page.content());

  const elmSelector = '.markdown.prose.max-w-none'
  const description =  $(elmSelector).html(); 
    const katas:mongoose.Types.ObjectId[] = []
    $('.list-item-kata').each((i,e) =>{
        katas.push(mongoose.Types.ObjectId(e.attribs.id));
    } )
  await browser.close();
  return {
      description, katas
  }
};