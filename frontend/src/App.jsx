import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsBlock from "./components/NewsBlock";
import SummarizerBlock from "./components/SummarizerBlock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SummarizerBlock />} />
        <Route path="/news" element={<NewsBlock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
