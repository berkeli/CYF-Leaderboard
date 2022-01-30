import express from 'express';
import mongoose from 'mongoose';
import { AuthoredCollectionModel as AuthCollection } from './entities/authoredCollection';
import dataCollector from './data-collector';
import collectionsScraper from './data-collector/collectionsScraper';
import kataScraper from './data-collector/kataScraper';
import scraper from './data-collector/scraper';
import connect from './utils/connect';
const app = express();


const main = async () => {
  app.listen(4000, () => {
    console.log('server started on http://localhost:4000');
  });
  await connect();
  const getCollections = await collectionsScraper('CodeYourFuture');
  const collectionIDs:mongoose.Types.ObjectId[] = [];
  getCollections.forEach( async (collection) => {
    const addData = await kataScraper(collection._id.toString());
    collectionIDs.push(collection._id);
    collection = {
      ...collection, 
      ...addData
    }
  })
  AuthCollection.updateMany({_id: {$in: collectionIDs }, })
  // const data = await scraper();
  // console.log(data);
}
main();
