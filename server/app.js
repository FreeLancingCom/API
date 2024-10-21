import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser'; // Optional: Can use express.json()
import compression from 'compression';
import router from './router.js'; 
import { API_BASE_PATH } from '../config/env/index.js';
import requestLogger from '../common/middleware/requestLogger/index.js';
import { ErrorHandler } from '../common/middleware/errorHandler/index.js';
import cookieParser from 'cookie-parser'; // Parses cookies sent with requests

// CORS configuration (adjust 'origin' for production)
const corsOptions = {
    origin: '*',  // Consider restricting this to specific domains in production
    maxAge: 3600, // Cache pre-flight responses for 1 hour
    credentials : true // Enable passing cookies from client to server
};

// Helmet configuration for security
const helmetOptions = {
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Cross-origin resource policy
};

const app = express();

// Parse cookies sent in the request
app.use(cookieParser());

// Use Helmet for secure headers
app.use(helmet(helmetOptions));

// Enable Gzip compression for responses
app.use(compression());

// Log incoming requests
app.use(requestLogger);

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Parse JSON request bodies with a limit of 10MB (alternatively, you can use express.json())
app.use(bodyParser.json({ limit: '10mb' }));

// Register the router under the base API path
app.use(`${API_BASE_PATH}`, router);

// Error handler middleware to handle errors globally
app.use(ErrorHandler());

export default app;
