import express from 'express';
import RegisterController from '../controllers/register.controller';
import validator from '../middlewares/validator';

const router = express.Router();

router.post('/register', validator('register'), async (_req, res) => {
  const response = await RegisterController.signUp(_req.body);
  return res.status(response.status).json(response);
});

export default router;
