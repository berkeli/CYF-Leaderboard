/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import express from 'express';
import cron from 'node-cron';
import dataCollector from './data-collector';
import collectionsScraper from './data-collector/collectionsScraper';
import scraper from './data-collector/scraper';
import kataScraper from './data-collector/kataScraper';
import connect from './utils/connect';

const app = express();

const updateData = async () => {
  const getCollections = await collectionsScraper('CodeYourFuture');

  for (const coll of getCollections) {
    await kataScraper(coll);
  }
  const getUsers = await scraper('CodeYourFuture');

  for (const user of getUsers) {
    await dataCollector(user);
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
