import { getUsersFromCache } from './../cache/';
import Express from 'express';
import { Query } from 'express-serve-static-core';
import { Router } from 'express';
import { AuthoredCollectionModel as AuthoredCollection } from '../entities/authoredCollection';

const routes = Router();
interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T
}

routes.get('/users', async (req:TypedRequestQuery<{q?: string; page: string; perPage: string; clan: string;}>, res) => {
  const {q, page, perPage, clan} = req.query;
  const data = await getUsersFromCache({q, page: parseInt(page), perPage: parseInt(perPage), clan})
  res.set('total', data.total);
  res.status(200).json({ data: data.data })
});
routes.get('/collections', async (_req, res) => {
  const colls = await AuthoredCollection.find().sort({ order: 1 });
  res.status(200).json({ data: colls });
});
export default routes;
