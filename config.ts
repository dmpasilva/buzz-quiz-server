import * as dotenv from 'dotenv';

dotenv.config({
  path: `./environment/${process.env.NODE_ENV}.env`
});

export const ENVIRONMENT = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const REDIRECT_URL = process.env.REDIRECT_URL;
export const SECRET = process.env.SECRET;