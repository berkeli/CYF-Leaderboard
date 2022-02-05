import { Router } from 'express';

const routes = Router();

routes.get('/', (_req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

export default routes;
