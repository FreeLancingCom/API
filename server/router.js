import express from 'express';
import { StatusCodes } from 'http-status-codes';


const router = express.Router();



import userRoutes from './users/routes/index.js';
import addressesRoutes from './addresses/router/index.js';
import profileRoutes from './profile/router/index.js'
import productsRoutes from './products/router/index.js';
import packagesRoutes from './package/router/index.js';
import cartRoutes from './cart/router/index.js';
import commentsRoutes from './comments/router/index.js';

import couponsRoutes from './coupons/router/index.js';
import orderRoutes from './orders/router/index.js';




router.use('/users', userRoutes);
router.use('/addresses', addressesRoutes);
router.use('/profile', profileRoutes);
router.use('/products', productsRoutes);
router.use('/packages', packagesRoutes);
router.use('/cart', cartRoutes);
router.use('/comments', commentsRoutes);
router.use('/coupons' , couponsRoutes);
router.use('/orders', orderRoutes);

router.use('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    date: new Date()
  };

  res.status(StatusCodes.OK).send(data);
});

export default router;