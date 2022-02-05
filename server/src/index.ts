/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import express from 'express';
import cron from 'node-cron';
import dataCollector from './data-collector';
import collectionsScraper from './data-collector/collectionsScraper';
import scraper from './data-collector/scraper';
import kataScraper from './data-collector/kataScraper';
import connect from './utils/connect';
import { UserModel as User } from './entities/user';

const app = express();

const updateData = async () => {
  const getCollections = await collectionsScraper('CodeYourFuture');

  for (const coll of getCollections) {
    await kataScraper(coll);
  }
  const getUsers = await scraper('CodeYourFuture');

  const bulkWriteDoc = await Promise.all(getUsers.map(async (e) => dataCollector(e)));

  try {
    User.bulkWrite(bulkWriteDoc, { ordered: false });
  } catch (e) {
    console.log(e);
  }
}

cron.schedule('0 0 0 * * *', () => {
  console.log('Cron job started')
  updateData();
})

const main = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
  });
  await connect();
  updateData();
}
main();
