import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import summarizer from "../../python-api/summarize.js";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/news"); 
        console.log("Response data: ", response.data);
        const summarizedData = await summarizer(response.data);
        setNews(summarizedData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const goToNextNews = () => {
    setCurrentNewsIndex((prevIndex) =>
      prevIndex === news.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevNews = () => {
    setCurrentNewsIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Trending News
        </h1>
        <div className="relative bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg text-gray-800">
            {news.length > 0 && (
              <span className="block leading-relaxed">
                {news[currentNewsIndex]}
              </span>
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={goToPrevNews}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={goToNextNews}
          >
            Next
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBackToHome}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
