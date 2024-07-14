import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import summarizer from "../../python-api/summarize.js";

function SummarizerBlock() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSummarizeClick = async () => {
    try {
      const summarizedData = await summarizer([inputText]);
      if (Array.isArray(summarizedData)) {
        const summarizedText = summarizedData
          .map((char) => (char === "" ? " " : char))
          .join("");
        setSummary(summarizedText);
      } else {
        console.error("Unexpected data format from summarizer:", summarizedData);
        setSummary("Error summarizing text");
      }
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary("Error summarizing text");
    }
  };

  const handleNavigateToNews = () => {
    navigate("/news");
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter((word) => word !== "").length;
  };

  const inputWordCount = countWords(inputText);
  const summaryWordCount = countWords(summary);

  return (
    <div className="container mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Text Summarizer</h2>
      <textarea
        className="w-full p-2 mb-4 border rounded-md resize-none"
        placeholder="Enter text to summarize..."
        value={inputText}
        onChange={handleInputChange}
        rows={6}
        style={{ wordSpacing: "1px" }}
      />
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <span className="text-gray-700 mr-2">Word Count Before: {inputWordCount}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            onClick={handleSummarizeClick}
          >
            Summarize
          </button>
        </div>
        {summary && (
          <div className="text-center md:text-right">
            <span className="text-gray-700">Word Count After: {summaryWordCount}</span>
          </div>
        )}
      </div>
      {summary && (
        <div className="mt-4 p-4 border rounded-md">
          <h3 className="text-lg font-bold mb-2">Summary:</h3>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
      <div className="mt-4 text-center">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleNavigateToNews}
        >
          Go to News
        </button>
      </div>
    </div>
  );
}

export default SummarizerBlock;
