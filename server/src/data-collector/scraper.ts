import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { autoScroll, isTagElement } from './utils';

export default async (username: string):Promise<string[]> => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(`https://www.codewars.com/users/${username}/following`);
  await page.setViewport({ width: 1200,
    height: 800 });
  await autoScroll(page);
  const $ = cheerio.load(await page.content());
  await browser.close();
  const elmSelector = 'table > tbody > tr'
  const usernames:string[] = []
  $(elmSelector).each((_i, e) => {
    if (isTagElement(e)) {
      usernames.push(encodeURI(e.attribs['data-username']))
    }
  })  
  return usernames
};
