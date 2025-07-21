import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  apiUrl: string;
  allowOrigins: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  apiUrl: process.env.API_URL || '',
  allowOrigins: process.env.ORIGIN || 'http://localhost:4200',
};

export default config;
