import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admins',
    route: 'exampleRoutes',
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const routes = router;
