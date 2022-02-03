import express from 'express';
import cron from 'node-cron';
import { AuthoredCollection } from './entities/authoredCollection';
import collectionsScraper from './data-collector/collectionsScraper';
import kataScraper from './data-collector/kataScraper';
import connect from './utils/connect';

const app = express();

const updateData = async () => {
  const getCollections = await collectionsScraper('CodeYourFuture');

  getCollections.forEach(async (collection:AuthoredCollection) => {
    await kataScraper(collection);
  })
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
