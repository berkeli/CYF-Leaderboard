import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import { AuthoredCollection, AuthoredCollectionModel as AuthCollection } from '../entities/authoredCollection';
import { fetchKataInfo } from '.';
import { KataModel as Kata, Kata as KataClass } from '../entities/kata';
import { isTagElement } from './utils';
import { UserModel as User } from '../entities/user';

export default async (collection: AuthoredCollection):Promise<void> => {
  const URL = `https://www.codewars.com/collections/${collection._id.toString()}`;
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.setViewport({ width: 1200,
    height: 800 });

  const $ = cheerio.load(await page.content());
  await browser.close();
  const elmSelector = '.markdown.prose.max-w-none'
  const description = $(elmSelector).html();
  const katas:Ref<KataClass>[] = []
  const katasToFetch: string[] = [];
  $('.list-item-kata').each((_i, e:cheerio.Element) => {
    if (isTagElement(e)) {
      katas.push(new mongoose.Types.ObjectId(e.attribs.id));
      katasToFetch.push(e.attribs.id);
    }
  })
  
  try {
    Kata.bulkWrite(await fetchKataInfo(katasToFetch), { ordered: false });
  } catch (e) {
    console.log(e);
  }
  await AuthCollection.findOneAndUpdate({ _id: collection._id }, { ...collection, description, katas }, { upsert: true });
};

export const enrichMissingKatas = async() => {
  const getUserKatas = await User.find({}, {completedKatas: 1, _id: 0}).exec();
  const getKatas = getUserKatas.map(e => e.completedKatas);
  const kataIds = getKatas.flat().map(e=> e.id && e.id.toString());
  const katasInDB = await Kata.find({}, {_id: 1})
  const DBKataIds = katasInDB.map(e=> e._id?.toString());
  const katasToFetch = kataIds.filter(e => e && !DBKataIds.includes(e));
  if (katasToFetch.length === 0) return
  try {
    Kata.bulkWrite(await fetchKataInfo(katasToFetch), { ordered: false });
  } catch (e) {
    console.log(e.message);
  }
}