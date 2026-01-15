import React, { useState, useEffect, useMemo } from "react";

// --- Types ---
export interface Cast {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  imageUrl: string;
  category: string;
  tagline?: string;
  releaseDate?: string;
  duration?: string;
  genres?: string[];
  overview?: string;
  cast?: Cast[];
}

const App: React.FC = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState("Trending");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Backend Data Fetching ---
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Fetches from your Node.js backend based on tab and search query
        const response = await fetch(
          `https://movie-hub-s7si.onrender.com/api/movies?category=${activeTab}&search=${searchQuery}`
        );
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce to prevent server spam while typing
    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [activeTab, searchQuery]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white font-sans transition-all duration-500">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#0b1120]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => { setSelectedMovie(null); setSearchQuery(""); }}
        >
          <div className="bg-blue-600 p-1.5 rounded shadow-lg shadow-blue-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">MovieHub</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-400 font-medium">
          {["Home", "Trending", "Top Rated", "Upcoming"].map((item) => (
            <button 
              key={item} 
              onClick={() => { setSelectedMovie(null); if(item !== "Home") setActiveTab(item); }} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {!selectedMovie ? (
        <>
          {/* Hero Section */}
          <header className="flex flex-col items-center py-16 px-4 text-center animate-in fade-in duration-700">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Discover Movies</h1>
            <p className="text-gray-400 mb-8 text-lg">Explore trending, top-rated, and upcoming movies</p>

            {/* Search Section */}
            <div className="relative w-full max-w-2xl mb-8">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search movies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 transition-all shadow-inner" 
              />
            </div>

            <div className="flex gap-4">
              {["Trending", "Top Rated", "Upcoming"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setVisibleCount(10); }}
                  className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 cursor-pointer ${
                    activeTab === tab ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40" : "bg-[#1e293b] text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </header>

          {/* Movie Grid */}
          <main className="max-w-7xl mx-auto px-6 pb-20">
            {loading && movies.length === 0 ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.slice(0, visibleCount).map((movie) => (
                  <div 
                    key={movie.id} 
                    onClick={() => setSelectedMovie(movie)} 
                    className="group cursor-pointer animate-in zoom-in-95 duration-300"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 shadow-xl">
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.title} 
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs font-bold">{movie.rating}</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-[#1e293b] p-4 rounded-xl border border-gray-800 group-hover:border-blue-500/50 transition-colors">
                      <h3 className="font-bold text-lg truncate">{movie.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{movie.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {!loading && visibleCount < movies.length && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={handleLoadMore} 
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-bold transition-all hover:px-12 shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  Load More
                </button>
              </div>
            )}
          </main>
        </>
      ) : (
        /* Movie Detail View */
        <div className="animate-in slide-in-from-bottom-10 duration-500">
          <div className="relative h-[450px] w-full">
            <img 
              src={selectedMovie.imageUrl} 
              className="w-full h-full object-cover opacity-20 blur-xl" 
              alt="backdrop" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />
            
            <button 
              onClick={() => setSelectedMovie(null)} 
              className="absolute top-8 left-8 p-3 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all border border-white/10 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>

            <div className="absolute -bottom-20 left-8 md:left-20 flex flex-col md:flex-row gap-8 items-end w-full max-w-6xl">
              <img 
                src={selectedMovie.imageUrl} 
                className="w-48 md:w-64 rounded-2xl shadow-2xl border-4 border-[#0b1120]" 
                alt="poster" 
              />
              <div className="flex-1 pb-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-2">{selectedMovie.title}</h1>
                <p className="text-gray-400 italic text-xl mb-4">"{selectedMovie.tagline}"</p>
                
                <div className="flex flex-wrap gap-6 text-sm md:text-base mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">★</span> 
                    <b className="text-xl">{selectedMovie.rating}</b> 
                    <span className="text-gray-500">(9,113 votes)</span>
                  </div>
                  <div className="flex items-center gap-2">📅 <span>{selectedMovie.releaseDate}</span></div>
                  <div className="flex items-center gap-2">🕒 <span>{selectedMovie.duration}</span></div>
                </div>

                <div className="flex gap-3">
                  {selectedMovie.genres?.map((g) => (
                    <span key={g} className="px-4 py-1 bg-blue-900/40 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-8 mt-36 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-12">{selectedMovie.overview}</p>

                <h2 className="text-3xl font-bold mb-8">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {selectedMovie.cast?.map((person) => (
                    <div key={person.name} className="bg-[#1e293b] rounded-xl overflow-hidden border border-gray-800 group hover:border-blue-500/50 transition-all">
                      <img 
                        src={person.imageUrl} 
                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform" 
                        alt={person.name} 
                      />
                      <div className="p-4">
                        <p className="font-bold truncate">{person.name}</p>
                        <p className="text-gray-500 text-sm truncate">{person.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;