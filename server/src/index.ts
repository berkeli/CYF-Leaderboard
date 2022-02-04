/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import express from 'express';
import cron from 'node-cron';
import collectionsScraper from './data-collector/collectionsScraper';
import kataScraper from './data-collector/kataScraper';
import connect from './utils/connect';

const app = express();

const updateData = async () => {
  const getCollections = await collectionsScraper('CodeYourFuture');

  for (const coll of getCollections) {
    await kataScraper(coll);
  }
}

cron.schedule('0 0 0 * * *', () => {
  console.log('Cron job started')
  updateData();
})

const main = async () => {
  app.listen(4000, () => {
    console.log('server started on http://localhost:4000');
  });
  await connect();
  updateData();
}
main();
