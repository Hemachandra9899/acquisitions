// src/services/auth.service.js
import logger from '#middleware/logger.js';   // ✅ Winston logger
import { db } from '#config/database.js';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { users } from '../models/user.model.js';   // your Drizzle schema

export const hashedpassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (e) {
    logger.error(e);  // ✅ works with Winston
  }
};

export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    const existinguser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existinguser.length > 0) {
      throw new Error('user already existing');
    }

    const hashedPassword = await hashedpassword(password);

    const [newuser] = await db
      .insert(users)
      .values({ name, email, password: hashedPassword, role })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      });

    logger.info('user created successfully', { email }); // ✅ Winston log
    return newuser;
  } catch (e) {
    logger.error(e); // ✅ works now
    throw e;
  }
};
