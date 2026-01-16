# 🎬 MovieHub - Movie Discovery App

A sleek, responsive movie discovery platform that allows users to explore trending, top-rated, and upcoming movies. Built with a focus on performance, clean UI, and smooth asynchronous data handling.

## 🌟 Features

* **Real-time Data:** Fetches live movie data using the TMDB API.
* **Advanced Search:** Integrated search functionality with **Debouncing** to optimize API usage.
* **Dynamic Routing/State:** Switch between Trending, Top Rated, and Upcoming categories instantly.
* **Detailed Insights:** Clicking a movie reveals a dedicated view with:
* High-res backdrops and posters.
* Movie tagline, overview, and genres.
* Cast list with character names and photos.


* **Responsive Design:** Optimized for all screen sizes using Tailwind CSS.
* **Performance:** Smooth transitions and conditional rendering for a "single-page" experience.

## 🛠️ Tech Stack

* **Frontend:** React.js (Functional Components, Hooks)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Modern Dark UI)
* **Data Fetching:** Fetch API / Asynchronous Promises
* **Icons:** Heroicons

## 🚀 Getting Started

### Prerequisites

* Node.js installed on your machine.
* A TMDB API Key (Get it for free [here](https://www.google.com/search?q=https://www.themoviedb.org/settings/api)).

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/movie-hub.git
cd movie-hub

```


2. **Install dependencies:**
```bash
npm install

```


3. **Set up Environment Variables:**
Create a `.env` file in the root directory and add your TMDB key:
```env
# If using Create React App
REACT_APP_TMDB_KEY=your_api_key_here

# If using Vite
VITE_TMDB_KEY=your_api_key_here

```


4. **Run the application:**
```bash
npm start # or npm run dev

```



## 🧠 Technical Challenges & Learnings

### 1. Debouncing Search

To prevent the application from making an API call for every single keystroke, I implemented a custom debounce logic. This waits for the user to finish typing for 400ms before triggering the fetch, significantly reducing unnecessary network load.

### 2. Complex API Integration

TMDB separates "basic info" from "cast info." I used `Promise.all` to fetch both data streams simultaneously when a user selects a movie, ensuring the details page loads all information at once for a better user experience.

### 3. State Management

Managing the transition between the home grid and the detail view while maintaining the scroll position and category state was a key focus during development.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed by Mohit Kumawat**

---