import { UserModel as User } from './../entities/user';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';

const URL = 'https://www.codewars.com/users/CodeYourFuture/authored_collections';

const isTagElement = (element: any): element is cheerio.TagElement => element?.attribs !== undefined;

import { AuthoredCollectionModel as AuthoredCollection} from '../entities/authoredCollection';

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

export default async (username:string):Promise<{_id: mongoose.Types.ObjectId, createdByName:string, name: string}[]> => {
  const URL = `https://www.codewars.com/users/${username}/authored_collections`
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.setViewport({ width: 1200,
    height: 800 });

  await autoScroll(page);
  const $ = cheerio.load(await page.content());
  const elmSelector = '.list-item-collection'

  const collectionIds:{_id: mongoose.Types.ObjectId, name: string}[] = []
  $(elmSelector).each((_i, e: cheerio.Element) => {
    if (isTagElement(e)) {
      collectionIds.push({ _id: new mongoose.Types.ObjectId(e.attribs.id), name: e.attribs['data-title'] });
    }

  const collections:{_id: mongoose.Types.ObjectId, createdByName:string, name: string}[] = []
  let userId:string;
  const userFromDB = await User.findOne({ codewarsUsername: username }).orFail(() => Error('Not found'));
  userId = userFromDB._id;
  console.log('userid', userId);
  $(elmSelector).each((i, e) => {
    collections.push({ _id: new mongoose.Types.ObjectId(e.attribs.id), createdByName: username, createdBy: userId, name: e.attribs['data-title'] });
  })
  await browser.close();
  return collections
};
