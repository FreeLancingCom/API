import express from 'express';
import { StatusCodes } from 'http-status-codes';
import userRouter from './users/routers/index.js';
import emailRouter from './email/routes/index.js';
import productsRouter from './products/routers/index.js';
import addressRouter from './addresses/routers/index.js';
import cityRouter from './cities/routers/index.js';
import vehicleRouter from './vehicles/routers/index.js';
import notificationRouter from './notifications/routers/index.js';
import countryRouter from './countries/routers/index.js';
import maintenanceCenterRouter from './maintenanceCenter/routers/index.js';
import productTypeRouter from './productTypes/routers/index.js';
import serviceTypeRouter from './serviceTypes/routers/index.js';
import services from './services/routers/index.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/email', emailRouter);
router.use('/addresses', addressRouter);
router.use('/countries', countryRouter);
router.use('/notifications', notificationRouter);
router.use('/products', productsRouter);
router.use('/productTypes', productTypeRouter);
router.use('/serviceTypes', serviceTypeRouter);
router.use('/vehicles', vehicleRouter);
router.use('/cities', cityRouter);
router.use('/maintenanceCenter', maintenanceCenterRouter);
router.use('/services', services);

router.use('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    date: new Date()
  };

  res.status(StatusCodes.OK).send(data);
});

export default router;
