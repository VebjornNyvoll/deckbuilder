import dotenv from "dotenv";
dotenv.config();

const production = process.env.production == "true" ? true : false;

const env = {
  PORT: parseInt(process.env.port),
  MONGOOSE_URI: process.env.MONGOOSE_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

export { env };
