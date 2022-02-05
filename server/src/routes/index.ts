import { Router } from 'express';
import { UserModel as User } from '../entities/user';

const routes = Router();

routes.get('/', (_req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
routes.get('/users', async (_req, res) => {
  const users = await User.find();
  res.status(200).json({ data: users });
});
export default routes;
