import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = "https://newsapi.org/v2/everything";
const query = "india";
const apiKey = process.env.API_KEY;
const language = "hi";
const fromDate = "2024-07-12";
const toDate = "2024-07-12";

const GET_NEWS_ENDPOINT = `${baseUrl}?q=${query}&apiKey=${apiKey}&language=${language}&from=${fromDate}&to=${toDate}`;

export const fetchNews = async () => {
  try {
    const response = await axios.get(GET_NEWS_ENDPOINT);
    
    if (!response.data.articles || response.data.articles.length === 0) {
      throw new Error('No articles found');
    }

    const articles = response.data.articles.slice(0, 5); // Get up to 5 articles

    const articlePromises = articles.map(async (article) => {
      try {
        const htmlResponse = await axios.get(article.url);
        const dom = new JSDOM(htmlResponse.data, { url: article.url });
        const parsedArticle = new Readability(dom.window.document).parse();
        article.description = parsedArticle.textContent.trim();
        return article.description;
      } catch (error) {
        console.error(`Error parsing article ${article.title}:`, error);
        return null;
      }
    });

    const parsedArticles = await Promise.all(articlePromises);
    const validArticles = parsedArticles.filter((article) => article !== null);
    return validArticles;
  } catch (error) {
    console.error('Error fetching or parsing news:', error);
    return [];
  }
};

// // and we need jsdom and Readability to parse the article HTML
// import {JSDOM} from 'jsdom'
// // const { JSDOM } = require('jsdom');
// import { Readability } from '@mozilla/readability'

// // First lets get some search data from News API

// // Build the URL we are going request. This will get articles related to Apple and sort them newest first
// let url = 'https://newsapi.org/v2/everything?' +
// 'q=Apple&' +
// 'sortBy=publishedAt&' +
// 'apiKey=8c97e6f3661a48fdbefe6409dbea2d4a';

// // Make the request with axios' get() function
// axios.get(url).then(function(r1) {

//   // At this point we will have some search results from the API. Take the first search result...
//   let firstResult = r1.data.articles[0];

//   // ...and download the HTML for it, again with axios
//   axios.get(firstResult.url).then(function(r2) {

//     // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
//     let dom = new JSDOM(r2.data, {
//       url: firstResult.url
//     });

//     // now pass the DOM document into readability to parse
//     let article = new Readability(dom.window.document).parse();

//     // Done! The article content is in the textContent property
//     console.log(article.textContent);
//   })
// })
