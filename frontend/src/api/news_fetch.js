import axios from "axios";

const fetchNews = async () => {
  try {
    const response = await axios.get('/news'); // Adjust the endpoint based on your backend setup
    console.log(response);
    if (!response.data || response.data.length === 0) {
      throw new Error("No articles found");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return []; // Return empty array or handle error accordingly
  }
};

export default fetchNews;
