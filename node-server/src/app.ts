import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import itemRoutes from './routes/itemRoutes';
import config from './config/config';
import corsOptions from './middlewares/cors';

const { port } = config;

const app = express();

app.use(express.json());

app.use('/api/items', corsOptions, itemRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
