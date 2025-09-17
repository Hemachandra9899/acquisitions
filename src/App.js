import express from 'express';
import helmet from 'helmet';
import logger from '#middleware/logger.js';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from '#routes/auth.router.js';
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined', { stream: logger.stream }));
app.get('/health', (req, res) => {
  logger.info('Health check');
  res.status(200).send('Hello World!');
});
app.use('/api/auth', router);

export default app;
