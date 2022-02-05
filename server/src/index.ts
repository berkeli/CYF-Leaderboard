/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import connect from './utils/connect';
import updateData from './utils/updateData';
import routes from './routes';

cron.schedule('0 0 0 * * *', () => {
  console.log('Daily cron job started')
  updateData();
})

const app = express();
app.use(cors());
app.use('/', routes);

const main = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
  });
  await connect();
}
main();
