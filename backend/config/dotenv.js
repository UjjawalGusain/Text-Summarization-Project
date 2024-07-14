import dotenv from 'dotenv';
dotenv.config();

const { PORT, API_KEY } = process.env;

export { PORT, API_KEY };