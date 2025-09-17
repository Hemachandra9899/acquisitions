import logger from '#middleware/logger.js';
import { signupSchema } from '../validations/auth.valadator.js';
import { createUser } from '../services/auth.service.js';
import {jwttoken} from '#utils/jwt.js';
import {cookies} from '#utils/cookie.js';
export const signup = async (req, res, next) => {
  try {
    const validateRes = signupSchema.safeParse(req.body);
    if (!validateRes.success) {
      return res.status(400).json({
        message: 'invalid input',
        error: validateRes.error,
      });
    }

    const { name, email, role,password } = validateRes.data;

    const user = await createUser ({ name, email, password ,role });
    const token = jwttoken.sign({ id: user.id, role: user.role });
    cookies.set(res,'token',token);
    logger.info('user created successfully', email);
    res.status(201).json({
      message: 'user created successfully',
      user: {
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
      },
    });
  } catch (e) {
    logger.error(e);
    if (e.message === 'user already existing') {
      return res.status(400).json({ message: 'user already existing' });
    }
    next(e);
  }
};
