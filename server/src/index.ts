import express from 'express';
import dataCollector from './data-collector';
import scraper from './data-collector/scraper';
import connect from './utils/connect';
const app = express();


const main = async () => {
  app.listen(4000, () => {
    console.log('server started on http://localhost:4000');
  });
  await connect();
  await dataCollector();
  // const data = await scraper();
  // console.log(data);
}
main();
