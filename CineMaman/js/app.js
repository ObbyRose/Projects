import API_KEY from './api.js'

import { 
    getFavoritesFromLocalStorage, 
    addToFavorites, 
    removeFromFavorites, 
    displayFavorites 
} from "./storage.js";

const homeLink = document.getElementById("home");
const moviesLink = document.getElementById("moviesLink");
const moviesList = document.getElementById("moviesList");
const movieSlider = document.getElementById("movieSlider");
const movieListContainer = document.querySelector(".movie-list");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const toggleBall = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(".navbar-container, .toggle-mode, .movie-slider, .movie-list, .main, .menu-list, .menu-button, .main-container, .search-results, .search-bar");
const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResults");

let currentSlide = 0;
let movies = [];
let genres = [];

function handleMovieClick(movie) {
    sessionStorage.setItem("selectedMovieId", movie.id);
    window.location.href = "./movieInfo.html";
}

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

async function fetchMovies() {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        movies = data.results.slice(0, 6);
        displayMovies(movies);
        displayAllMovies(data.results);
        setupAddToFavoritesButtons(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function getMovieGenres(genreIds) {
    return genreIds.map((id) => genres[id]).join(", ");
}

function displayMovies(movies) {
    movieSlider.innerHTML = movies
        .map(
            (movie) => `
                <div class="displayed-slider" data-movie-id="${movie.id}">
                    <div class="movie-slider-text">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <div class="movie-info" style="margin-left: 10px;">
                            <p class="title">${movie.title}</p>
                            <div class="movie-rating">
                                <p>${movie.overview}</p>
                                <p>Rating: ${movie.vote_average}</p>
                                <p><span>${getMovieGenres(movie.genre_ids)}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");

    document.querySelectorAll(".displayed-slider").forEach((slider) => {
        const movieId = slider.getAttribute("data-movie-id");
        slider.addEventListener("click", () => {
            const movie = movies.find(m => m.id == movieId);
            handleMovieClick(movie);
        });
    });
}

function displayAllMovies(movies) {
    movieListContainer.innerHTML = movies
        .map(
            (movie) => `
                <div class="displayed-movie" data-movie-id="${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-details">
                        <h3>${movie.title}</h3>
                        <p>Rating: ${movie.vote_average}</p>
                        <p>Genres: ${getMovieGenres(movie.genre_ids)}</p>
                        <button class="add-to-favorites" data-movie-id="${movie.id}">Add to Favorites</button>
                    </div>
                </div>
            `
        )
        .join("");

    document.querySelectorAll(".displayed-movie").forEach((movie) => {
        const movieId = movie.getAttribute("data-movie-id");
        movie.addEventListener("click", () => {
            const selectedMovie = movies.find(m => m.id == movieId);
            handleMovieClick(selectedMovie);
        });
    });
}

function setupAddToFavoritesButtons(movies) {
    document.querySelectorAll(".add-to-favorites").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const movieId = e.target.getAttribute("data-movie-id");
            const movie = movies.find((m) => m.id == movieId);
            if (movie) {
                addToFavorites({
                    id: movie.id,
                    title: movie.title,
                    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                });
            }
        });
    });
}

function slide(direction) {
    const totalSlides = movieSlider.childElementCount;
    currentSlide =
        direction === "left"
            ? (currentSlide - 1 + totalSlides) % totalSlides
            : (currentSlide + 1) % totalSlides;

    movieSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

if (window.location.pathname.includes("index.html")) {
    rightArrow.addEventListener("click", () => slide("right"));
    leftArrow.addEventListener("click", () => slide("left"));
}

toggleBall.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light-mode");
    items.forEach((item) => item.classList.toggle("light-mode"));
    toggleBall.classList.toggle("active");
    localStorage.setItem("lightMode", isLightMode);
});

if (window.location.pathname.includes("index.html")) {
    moviesLink.addEventListener("click", (event) => {
        event.preventDefault();
        moviesList.scrollIntoView({ behavior: "smooth" });
    });

    homeLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const menuButton = document.querySelector(".menu-button");
const menuList = document.querySelector(".menu-list");

menuButton.addEventListener("click", () => {
    menuList.classList.toggle("active");
});

const menuItems = document.querySelectorAll(".menu-list-item");
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        menuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        menuList.classList.remove("active");
    });
});

window.onload = async () => {
    const lightMode = localStorage.getItem("lightMode");
    if (lightMode === "true") {
        document.body.classList.add("light-mode");
        items.forEach((item) => item.classList.add("light-mode"));
        toggleBall.classList.add("active");
    }

    if (window.location.pathname.includes("index.html")) {
        await fetchGenres();
        fetchMovies();
    } else if (window.location.pathname.includes("favorites.html")) {
        displayFavorites();
    } else if (window.location.pathname.includes("movieInfo.html")) {
        displaySelectedMovie();
    }
};

searchInput.addEventListener("input", async function () {
    const query = searchInput.value.trim();
    if (query.length > 2) {
        const movies = await searchMovies(query);
        searchResultsContainer.style.display = "block";
        displaySearchResults(movies);
    } else {
        searchResultsContainer.style.display = "none";
    }
});

async function searchMovies(query) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
    }
}

function displaySearchResults(movies) {
    searchResultsContainer.innerHTML = "";

    movies.slice(0, 10).forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title}</p>
        `;
        listItem.addEventListener("click", () => handleMovieClick(movie));
        searchResultsContainer.appendChild(listItem);
    });
}

async function displaySelectedMovie() {
    const movieId = sessionStorage.getItem("selectedMovieId");
    const movieContainer = document.getElementById("movie-info-container");

    if (movieId && movieContainer) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
            );
            const movie = await response.json();

            const releaseDate = new Date(movie.release_date);
            const formattedReleaseDate = `${String(releaseDate.getDate()).padStart(2, '0')}/${String(releaseDate.getMonth() + 1).padStart(2, '0')}/${releaseDate.getFullYear()}`;

            const favorites = getFavoritesFromLocalStorage();
            let isFavorite = favorites.some((fav) => fav.id === parseInt(movieId, 10));

            movieContainer.innerHTML = `
                    <div class="movie-info">
                    <img id="movieInfo-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movieInfo-details">
                    <h1>${movie.title}</h1>
                        <p id="movie-overview">${movie.overview}</p>
                        <p><strong>Release Date:</strong> ${formattedReleaseDate}</p>
                        <p><strong>Rating:</strong> ${movie.vote_average}</p>
                        <p><strong>Genres:</strong> ${movie.genres.map(genre => genre.name).join(", ")}</p>
                        <button id="favorite-button" class="favorite-button">
                            ${isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                    </div>
                </div>
            `;

            const favoriteButton = document.getElementById("favorite-button");
            favoriteButton.addEventListener("click", () => {
                if (isFavorite) {
                    removeFromFavorites(movie.id);
                    alert(`${movie.title} has been removed from your favorites.`);
                } else {
                    addToFavorites({
                        id: movie.id,
                        title: movie.title,
                        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    });
                }
                isFavorite = !isFavorite;
                favoriteButton.textContent = isFavorite ? "Remove from Favorites" : "Add to Favorites";
            });

        } catch (error) {
            console.error("Error fetching movie details:", error);
            movieContainer.innerHTML = "<p>Failed to load movie details. Please try again later.</p>";
        }
    } else {
        console.error("Movie ID or container element not found.");
    }
}