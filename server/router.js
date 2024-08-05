import express from 'express';
import { StatusCodes } from 'http-status-codes';
import userRouter from './users/routers/index.js';
import emailRouter from './email/routes/index.js';
import productsRouter from './products/routers/index.js';

import notificationRouter from './notifications/routers/index.js';
import countryRouter from './countries/routers/index.js';

const router = express.Router();


router.use('/users', userRouter);
router.use('/email', emailRouter);

router.use('/countries', countryRouter);

router.use('/notifications', notificationRouter);
router.use('/products', productsRouter);


router.use('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    date: new Date()
  };

  res.status(StatusCodes.OK).send(data);
});

export default router;
