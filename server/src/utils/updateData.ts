/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import dataCollector from '../data-collector';
import kataScraper, { enrichMissingKatas } from '../data-collector/kataScraper';
import scraper from '../data-collector/scraper';
import collectionsScraper from '../data-collector/collectionsScraper';

export default async () => {
  const getCollections = await collectionsScraper('CodeYourFuture');

  for (const coll of getCollections) {
      await kataScraper(coll).catch(e => {
        throw Error(e.message)
      });
  }
  const getUsers = await scraper('CodeYourFuture');

  for (const user of getUsers) {
    console.log('Updating: ', user)
    await dataCollector(user).catch(e => {
      console.log(e.message)
    })
  }

  enrichMissingKatas();
}
