import express from 'express';
import { StatusCodes } from 'http-status-codes';


const router = express.Router();



import userRoutes from './users/routes/index.js';
import addressesRoutes from './addresses/router/index.js';





router.use('/users', userRoutes);
router.use('/addresses', addressesRoutes);

router.use('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    date: new Date()
  };

  res.status(StatusCodes.OK).send(data);
});

export default router;