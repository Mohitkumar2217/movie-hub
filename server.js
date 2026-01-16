const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

// --- 1. SCHEMAS & MODELS ---
const castSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    role: { type: String },
    imageUrl: { type: String },
});

const movieSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    year: { type: Number },
    rating: { type: Number },
    category: { type: String },
    imageUrl: { type: String },
    tagline: { type: String },
    releaseDate: { type: String },
    duration: { type: String },
    genres: [String],
    overview: { type: String },
    cast: [castSchema],
});

const Movie = mongoose.model("Movie", movieSchema);

// --- 2. THE SEED DATA ---
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

// const seedDatabase = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to MongoDB for seeding...");

//         // Clear existing data
//         await Movie.deleteMany({});
//         console.log("Old movies removed.");

//         // Insert new data
//         await Movie.insertMany(moviesDB);
//         console.log(`${moviesDB.length} movies seeded successfully!`); 
//     } catch (error) {
//         console.error("Error seeding database:", error);
//         process.exit(1);
//     }
// };

// seedDatabase();

// GET MOVIES (With Home/Category/Search logic)
app.get("/api/movies", async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
 
        if (category && category !== "Home") {
            query.category = category;
        }

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const results = await Movie.find(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET SINGLE MOVIE
app.get("/api/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findOne({ id: req.params.id });
        if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));