import { API_KEY } from "./api.js";

const movieSlider = document.getElementById("movieSlider");
const movieListContainer = document.querySelector(".movie-list");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(".navbar-container, .toggle-mode, .movie-slider");

let currentSlide = 0;
let movies = [];
let genres = {};

// Fetch genres from the TMDb API
async function fetchGenres() {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        genres = data.genres.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
        }, {});
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
}

// Fetch movies from the TMDb API
async function fetchMovies() {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        movies = data.results.slice(0, 6); // Show only a limited number of movies for the slider
        displayMovies(movies);
        displayAllMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Map genre IDs to genre names
function getMovieGenres(genreIds) {
    return genreIds.map(id => genres[id]).join(", ");
}

// Display movies in the slider
function displayMovies(movies) {
    movieSlider.innerHTML = "";
    movies.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.className = "displayed-slider";

        const movieGenres = getMovieGenres(movie.genre_ids); // Get the genres for the movie

        movieItem.innerHTML = `
        <div class="movie-slider-text"> <!-- Updated to include flex container -->
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info" style="margin-left: 10px;"> <!-- Add margin for spacing -->
                <p class="title">${movie.title}</p>
                <div class="movie-rating">
                <p>${movie.overview}</p>
                    <p>Rating: ${movie.vote_average}</p>
                    <p><span>${movieGenres}</span></p>
                </div>
            </div>
        </div>
    `;
        movieSlider.appendChild(movieItem);
    });
}

// Display all movies in the grid
function displayAllMovies(movies) {
    movieListContainer.innerHTML = "";
    movies.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.className = "displayed-movie";

        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-details">
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <p>Genres: ${getMovieGenres(movie.genre_ids)}</p>
                <button class="add-to-favorites">Add to Favorites</button>
            </div>
        `;
        movieListContainer.appendChild(movieItem);
    });
}

// Slide left or right in the movie slider
function slide(direction) {
    const totalSlides = movieSlider.childElementCount;
    if (direction === 'left') {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    } else {
        currentSlide = (currentSlide + 1) % totalSlides;
    }
    movieSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Toggle between dark and light mode
function toggleMode() {
    items.forEach(item => item.classList.toggle("light-mode"));
    ball.classList.toggle("active");
}

// Event listeners
leftArrow.addEventListener("click", () => slide('left'));
rightArrow.addEventListener("click", () => slide('right'));
ball.addEventListener("click", toggleMode);

// Initialize
fetchGenres().then(fetchMovies);
