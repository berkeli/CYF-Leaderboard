/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import dataCollector from '../data-collector';
import kataScraper from '../data-collector/kataScraper';
import scraper from '../data-collector/scraper';
import collectionsScraper from '../data-collector/collectionsScraper';

export default async () => {
  const getCollections = await collectionsScraper('CodeYourFuture');

  for (const coll of getCollections) {
    await kataScraper(coll);
  }
  const getUsers = await scraper('CodeYourFuture');

  await Promise.all(getUsers.map(async (e) => dataCollector(e)));
}
