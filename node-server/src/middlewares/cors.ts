import config from '../config/config';
import cors from 'cors';

const { allowOrigins } = config;

const corsOptions = {
  origin: allowOrigins,
};

export default cors(corsOptions);
