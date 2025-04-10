import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import MoviesPage from "./pages/Moviespage";
import MovieTrailer from './components/MovieTrailer';

function App() {
  const [trailerUrl, setTrailerUrl] = useState('');
  useEffect(() => {
    const fetchTrailerUrl = async () => {
      const url = "https://www.youtube.com/embed/4A_kmjtsJ7c?si=8FmIp_tJ8GmbCG1G";
      setTrailerUrl(url);
    };
    fetchTrailerUrl();
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies-trailer" element={<MovieTrailer trailerUrl={trailerUrl} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
