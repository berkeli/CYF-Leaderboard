import { Router } from 'express';
import { UserModel as User } from '../entities/user';

const routes = Router();

routes.get('/', (_req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
routes.get('/users', async (_req, res) => {
  const users = await User.find().populate({ path: 'completedKatas', populate: { path: 'id', model: 'Kata' } });
  res.status(200).json({ data: users });
});
export default routes;
