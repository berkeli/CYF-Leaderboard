/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import connect from './utils/connect';
import updateData from './utils/updateData';
import routes from './routes';
import redis from './utils/redis';

cron.schedule('0 0 0 * * *', () => {
  console.log('Daily cron job started')
  updateData();
})

const app = express();
app.use(cors({
  exposedHeaders: ['total']
}));
app.use('/', routes);

const main = async () => {
  const port = !process.env.PORT ? 4000 : process.env.PORT;
  app.listen(port, () => {
    console.log(`Server started on Port ${port}`);
  });

  await connect();

  await redis.connect();

  updateData();
}
main();
