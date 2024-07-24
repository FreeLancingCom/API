import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './router.js';
import { API_BASE_PATH } from '../config/env/index.js';
import requestLogger from '../common/middleware/requestLogger/index.js';
import { ErrorHandler } from '../common/middleware/errorHandler/index.js';

const corsOptions = {
    origin: '*',
    maxAge: 3600,
};
const helmetOptions = {
    crossOriginResourcePolicy: { policy: 'cross-origin' },
};

const app = express();

app.use(helmet(helmetOptions));
app.use(compression());
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(`${API_BASE_PATH}`, router);
app.use(ErrorHandler());

export default app;
