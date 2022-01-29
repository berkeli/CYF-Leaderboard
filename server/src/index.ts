import express from 'express';
import scraper from './data-collector/scraper';
const app = express();

const main = async () => {
  app.listen(4000, () => {
    console.log('server started on http://localhost:4000');
  });
  const data = await scraper();
  console.log(data);
}
main();
