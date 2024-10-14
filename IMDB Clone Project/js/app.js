    import { API_KEY } from "./api.js";

    const movieSlider = document.getElementById("movieSlider");
    const movieListContainer = document.querySelector(".movie-list");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    const ball = document.querySelector(".toggle-ball");
    const items = document.querySelectorAll(
    ".navbar-container, .toggle-mode, .movie-slider"
    );

    let currentSlide = 0;
    let movies = [];

    async function fetchMovies() {
    try {
        const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        movies = data.results.slice(0, 6);
        displayMovies(movies);
        displayAllMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
    }

    function displayMovies(movies) {
    movieSlider.innerHTML = "";
    movies.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.className = "displayed-movie";
        movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-details">
                    <p>${movie.overview}</p>
                    <p>Rating: ${movie.vote_average}</p>
                </div>
            `;
        movieSlider.appendChild(movieItem);
    });
    }

    function displayAllMovies(movies) {
    movieListContainer.innerHTML = "";
    movies.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.className = "displayed-movie";
        movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-details">
                    <p>${movie.title}</p>
                    <p>${movie.overview}</p>
                    <p>Rating: ${movie.vote_average}</p>
                    <button class="add-to-favorites">Add to Favorites</button>
                </div>
            `;
        movieListContainer.appendChild(movieItem);
    });
    }

    function slideLeft() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = movies.length - 1;
    }
    updateSliderPosition();
    }

    function slideRight() {
    if (currentSlide < movies.length - 1) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updateSliderPosition();
    }

    function updateSliderPosition() {
    movieSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    leftArrow.addEventListener("click", slideLeft);
    rightArrow.addEventListener("click", slideRight);

    ball.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    items.forEach((item) => {
        item.classList.toggle("light-mode");
    });
    ball.classList.toggle("active");
    });

    window.onload = fetchMovies;
