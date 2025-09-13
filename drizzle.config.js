import 'dotenv/config';

export default {
  schema: './src/models/*.js', // path to your models
  out: './drizzle', // where migrations will be stored
  dialect: 'postgresql', // correct spelling
  dbCredentials: {
    url: process.env.DATA_BASEURL, // must match .env
  },
};
