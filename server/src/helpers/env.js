import dotenv from 'dotenv';
dotenv.config();

const production = process.env.PRODUCTION == 'true' ? true : false;

const env = {
  PORT: parseInt(process.env.PORT),
  MONGOOSE_URI: process.env.MONGOOSE_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

export { env };
