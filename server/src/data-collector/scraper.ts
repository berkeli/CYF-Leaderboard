import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { autoScroll } from './utils';

const URL = 'https://www.codewars.com/users/CodeYourFuture/following'

export default async ():Promise<string[]> => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
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
