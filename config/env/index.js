import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const port = process.env.PORT;

export const environment = process.env.NODE_ENV || 'development';

export const mongoDBConfigs = {
  mongoURL: process.env.MONGO_URL
};

export const EMAIL_CONFIG = {
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD
};

export const API_BASE_URL = '/api';

export const API_VERSION = process.env.API_VERSION || 'v1';

export const API_BASE_PATH = `${API_BASE_URL}/${API_VERSION}`;

export const HOST = process.env.HOST || 'http://localhost:3005';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';