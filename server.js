const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "https://movie-hub-ens4.vercel.app/" }));

// Full dataset for the backend
const moviesDB = Array.from({ length: 40 }).map((_, i) => ({
    id: i + 1,
    title: i % 3 === 0 ? `Action Thriller ${i}` : i % 2 === 0 ? `Love Story ${i}` : `Space Odyssey ${i}`,
    year: 2024,
    rating: parseFloat((Math.random() * (9 - 5) + 5).toFixed(1)),
    category: i < 15 ? "Trending" : i < 30 ? "Top Rated" : "Upcoming",
    imageUrl: `https://picsum.photos/seed/${i + 50}/400/600`,
    tagline: "Experience the magic of cinema.",
    releaseDate: "January 15, 2024",
    duration: "2h 15m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    overview: "An immersive cinematic experience that explores deep themes of humanity and courage.",
    cast: [
        { id: 1, name: "Lead Actor", role: "Main", imageUrl: "https://picsum.photos/seed/a1/200/300" },
        { id: 2, name: "Supporting", role: "Friend", imageUrl: "https://picsum.photos/seed/a2/200/300" }
    ]
}));

// API Endpoint with Search and Category filters
app.get("/api/movies", (req, res) => {
    const { category, search } = req.query;
    let results = moviesDB;

    if (category) {
        results = results.filter(m => m.category === category);
    }

    if (search) {
        results = results.filter(m =>
            m.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json(results);
});

app.listen(5000, () => console.log("Backend running on port 5000"));