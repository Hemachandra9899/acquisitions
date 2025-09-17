import express from 'express';
import helmet from 'helmet';
import logger from '#middleware/logger.js';
import morgan from 'morgan';
import { signup } from '#controllers/auth.controller.js';
const router = express.Router();
router.use(helmet());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(morgan('combined', { stream: logger.stream }));

router.post('/sign-up', signup);
router.post('/sign-in', (req, res) => {
  logger.info('sign-in');
  res.send('Hello World');
});
router.post('/sign-out', (req, res) => {
  logger.info('sign-out');
  res.send('Hello World');
});

export default router;
