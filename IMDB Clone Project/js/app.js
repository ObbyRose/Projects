    import { API_KEY } from "./api.js";

    const homeLink = document.getElementById("home");
    const moviesLink = document.getElementById("moviesLink");
    const moviesList = document.getElementById("moviesList");
    const movieSlider = document.getElementById("movieSlider");
    const movieListContainer = document.querySelector(".movie-list");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    const toggleBall = document.querySelector(".toggle-ball");
    const items = document.querySelectorAll(
    ".navbar-container, .toggle-mode, .movie-slider, .movie-list, .main, .menu-list, .menu-button, .main-container, .search-results, .search-bar"
    );
    const searchInput = document.getElementById("searchInput");
    const searchResultsContainer = document.getElementById("searchResults");

    let currentSlide = 0;
    let movies = [];
    let genres = [];

    function getFavoritesFromLocalStorage() {
    const favorites = localStorage.getItem("favoriteMovies");
    return favorites ? JSON.parse(favorites) : [];
    }

    function saveFavoritesToLocalStorage(favorites) {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
    }
    function addToFavorites(movie) {
    let favorites = getFavoritesFromLocalStorage();

    if (!Array.isArray(favorites)) {
        favorites = [];
    }
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    if (!isFavorite) {
        favorites.push(movie);
        saveFavoritesToLocalStorage(favorites);
        alert(`${movie.title} has been added to your favorites!`);
    } else {
        alert(`${movie.title} is already in your favorites.`);
    }
    }

    // Setup event listeners for adding movies to favorites
    function setupAddToFavoritesButtons(movies) {
    document.querySelectorAll(".add-to-favorites").forEach((button) => {
        button.addEventListener("click", (e) => {
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

    function displayFavorites() {
    const favoritesContainer = document.querySelector(".favorites-list");

    if (!favoritesContainer) {
        console.error(
        "Favorites container not found. Make sure you have an element with class 'favorites-list'."
        );
        return;
    }

    let favorites = getFavoritesFromLocalStorage();

    favoritesContainer.innerHTML = "";

    if (!favorites || favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>You have no favorite movies yet.</p>";
        return;
    }

    favorites.forEach((movie) => {
        const movieElement = `
                                    <div class="favorite-movie">
                                    <img src="${movie.poster}" alt="${movie.title}">
                                            <h3>${movie.title}</h3>
                                            <button id="remove-button" class="remove-favorite" data-movie-id="${movie.id}">Remove</button>
                                        </div>
                                        `;
        favoritesContainer.innerHTML += movieElement;
    });

    function removeFromFavorites(movieId) {
        let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        movieId = parseInt(movieId, 10);
        const movieIndex = favoriteMovies.findIndex((movie) => movie.id === movieId);

        if (movieIndex !== -1) {
        favoriteMovies.splice(movieIndex, 1);
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));

        const movieElement = document.querySelector(
            `[data-movie-id="${movieId}"]`
        );
        if (movieElement) {
            movieElement.parentNode.removeChild(movieElement);
        }

        displayFavorites();
        } else {
        console.error("Movie with ID", movieId, "not found in favorites.");
        }
    }

    document.querySelectorAll(".remove-favorite").forEach((button) => {
        button.addEventListener("click", (e) => {
        const movieId = e.target.getAttribute("data-movie-id");
        removeFromFavorites(movieId);
        });
    });
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
                                                <div class="displayed-slider">
                                                    <div class="movie-slider-text">
                                                        <img src="https://image.tmdb.org/t/p/w500${
                                                        movie.poster_path
                                                        }" alt="${movie.title}">
                                                        <div class="movie-info" style="margin-left: 10px;">
                                                            <p class="title">${
                                                            movie.title
                                                            }</p>
                                                            <div class="movie-rating">
                                                                <p>${
                                                                movie.overview
                                                                }</p>
                                                                <p>Rating: ${
                                                                movie.vote_average
                                                                }</p>
                                                                <p><span>${getMovieGenres(
                                                                movie.genre_ids
                                                                )}</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            `
        )
        .join("");
    }

    // Function to display all movies
    function displayAllMovies(movies) {
    movieListContainer.innerHTML = movies
        .map(
        (movie) => `
                                                <div class="displayed-movie">
                                                    <img src="https://image.tmdb.org/t/p/w500${
                                                    movie.poster_path
                                                    }" alt="${movie.title}">
                                                    <div class="movie-details">
                                                        <h3>${movie.title}</h3>
                                                        <p>Rating: ${
                                                        movie.vote_average
                                                        }</p>
                                                        <p>Genres: ${getMovieGenres(
                                                        movie.genre_ids
                                                        )}</p>
                                                        <button class="add-to-favorites" data-movie-id="${
                                                        movie.id
                                                        }">Add to Favorites</button>
                                                    </div>
                                                </div>
                                            `
        )
        .join("");
    }

    // Function to slide the movie slider
    function slide(direction) {
    const totalSlides = movieSlider.childElementCount;
    currentSlide =
        direction === "left"
        ? (currentSlide - 1 + totalSlides) % totalSlides
        : (currentSlide + 1) % totalSlides;

    movieSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Add event listeners for arrows if on index.html
    if (window.location.pathname.includes("index.html")) {
    rightArrow.addEventListener("click", () => slide("right"));
    leftArrow.addEventListener("click", () => slide("left"));
    }

    // Toggle light/dark mode
    toggleBall.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light-mode");
    items.forEach((item) => item.classList.toggle("light-mode"));
    toggleBall.classList.toggle("active");
    localStorage.setItem("lightMode", isLightMode);
    });

    // Navigation links
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

    // Add active class to menu items
    const menuItems = document.querySelectorAll(".menu-list-item");
    menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        menuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        menuList.classList.remove("active");
    });
    });

    // On window load, check light mode and fetch movies or display favorites
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
    }
    };

    // Search functionality
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
        searchResultsContainer.appendChild(listItem);
    });
    }
