import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import { UserModel as User } from '../entities/user';
import { AuthoredCollection } from '../entities/authoredCollection';
import { autoScroll, isTagElement } from './utils';
import dataCollector from '.';

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

  const collections:AuthoredCollection[] = []
  let userFromDB = await User.findOne({ codewarsUsername: username }).exec();

  // Pull user information if it doesn't exist in DB
  if (!userFromDB) {
    await dataCollector(username);
    userFromDB = await User.findOne({ codewarsUsername: username }).exec();
  }

  const userId = new mongoose.Types.ObjectId(userFromDB?._id);
  $(elmSelector).each((_i, e: cheerio.Element) => {
    if (isTagElement(e)) {
      collections.push({ _id: new mongoose.Types.ObjectId(e.attribs.id), name: e.attribs['data-title'], createdByName: username, createdBy: userId });
    }
  })

  await browser.close();
  return collections
};
