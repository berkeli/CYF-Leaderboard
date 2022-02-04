import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import { AuthoredCollection, AuthoredCollectionModel as AuthCollection } from '../entities/authoredCollection';
import { fetchKataInfo } from '.';
import { Kata } from '../entities/kata';
import { isTagElement } from './utils';

export default async (collection: AuthoredCollection):Promise<void> => {
  const URL = `https://www.codewars.com/collections/${collection._id.toString()}`;
  console.log(`Scraping: ${collection.name}`);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.setViewport({ width: 1200,
    height: 800 });

  const $ = cheerio.load(await page.content());

  const elmSelector = '.markdown.prose.max-w-none'
  const description = $(elmSelector).html();
  const katas:Ref<Kata>[] = []
  const katasToFetch: string[] = [];
  $('.list-item-kata').each((_i, e:cheerio.Element) => {
    if (isTagElement(e)) {
      katas.push(new mongoose.Types.ObjectId(e.attribs.id));
      katasToFetch.push(e.attribs.id);
    }
  })
  await browser.close();
  fetchKataInfo(katasToFetch);
  await AuthCollection.findOneAndUpdate({ _id: collection._id }, { ...collection, description, katas }, { upsert: true });
};
