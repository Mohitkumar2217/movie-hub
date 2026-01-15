import React, { useState } from "react";
import { Movie } from "./types";
 
const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Movie 1",
    year: 2024,
    rating: 8.6,
    imageUrl:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Movie 2",
    year: 2024,
    rating: 7.7,
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Movie 3",
    year: 2024,
    rating: 8.8,
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    title: "Movie 4",
    year: 2024,
    rating: 6.6,
    imageUrl:
      "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    title: "Movie 5",
    year: 2024,
    rating: 7.9,
    imageUrl:
      "https://images.unsplash.com/photo-1544924405-b1748720c749?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    title: "Movie 6",
    year: 2024,
    rating: 8.5,
    imageUrl:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400",
  },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Trending");

  return (
    <div className="min-h-screen bg-[#0b1120] text-white font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#0b1120] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded">
            <svg
              className="w-2 h-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">MovieHub</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-400 font-medium">
          {["Home", "Trending", "Top Rated", "Upcoming"].map((item) => (
            <button key={item} className="hover:text-white transition-colors">
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Discover Movies</h1>
        <p className="text-gray-400 mb-8 text-lg">
          Explore trending, top-rated, and upcoming movies
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mb-8">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full bg-[#1e293b] border border-gray-700 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4">
          {["Trending", "Top Rated", "Upcoming"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-[#1e293b] text-gray-400 hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Movie Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_MOVIES.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-800">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs font-bold">{movie.rating}</span>
                </div>
              </div>
              <div className="mt-4 bg-[#1e293b] p-4 rounded-b-xl border-t-0 border border-gray-800">
                <h3 className="font-bold text-lg truncate">{movie.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
