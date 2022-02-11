import { Router } from 'express';
import { AuthoredCollectionModel as AuthoredCollection } from '../entities/authoredCollection';
import { UserModel as User } from '../entities/user';

const routes = Router();

routes.get('/', (_req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
routes.get('/users', async (_req, res) => {
  const users = await User.find().sort({ honor: -1 });
  res.status(200).json({ data: users });
});
routes.get('/collections', async (_req, res) => {
  const colls = await AuthoredCollection.find().sort({ order: 1 });
  res.status(200).json({ data: colls });
});
export default routes;
