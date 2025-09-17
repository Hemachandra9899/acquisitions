import jwt from 'jsonwebtoken';
import * as logger from 'morgan';

const JWT_SECRET =process.env.JWT_SECRET || ' THIS IS A SECTRET THAT CANOT BE ISSUED PUBLICLY';
const JWT_EXPIRY = '1h';
export const jwttoken = {
  sign: (payload)=>{
    try{
      return jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRY});
    }catch(e){
      logger.error(e);
    }
  },
  verify:(token)=>{
    try{
      return jwt.verify(token, JWT_SECRET);
    }catch(e){
      logger.error(e);
    }
  }
};