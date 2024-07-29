import express from 'express';
import { StatusCodes } from 'http-status-codes';
import userRouter from './users/routers/index.js';
import emailRouter from './email/routes/index.js';

import cityRouter from './cities/routers/index.js';

import notificationRouter from './notifications/routers/index.js';

const router = express.Router();


router.use('/users', userRouter);
router.use('/email', emailRouter);

router.use('/notifications', notificationRouter);

router.use("/cities", cityRouter);

router.use('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    date: new Date()
  };

  res.status(StatusCodes.OK).send(data);
});

export default router;
