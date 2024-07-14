import "dotenv/config.js";

const baseUrl = process.env.BASE_URL;
const query = process.env.QUERY;
const apiKey = process.env.API_KEY;
const language = process.env.LANGUAGE;
const fromDate = process.env.FROM_DATE;
const toDate = process.env.TO_DATE;

export const GET_NEWS_ENDPOINT = `${baseUrl}?q=${query}&apiKey=${apiKey}&language=${language}&from=${fromDate}&to=${toDate}`;

console.log(GET_NEWS_ENDPOINT);
