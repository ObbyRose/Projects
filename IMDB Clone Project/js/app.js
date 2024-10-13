        const ball = document.querySelector(".toggle-ball");
        const items = document.querySelectorAll(
        ".movie-list,.navbar-container,.toggle"
        );
        ball.addEventListener("click", () => {
        items.forEach((item) => {
            item.classList.toggle("active");
        });
        ball.classList.toggle("active");
        });

import { apiKey } from "./api.js";

const movieListContainer = document.querySelector('.movie-list');

async function fetchMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

    function displayMovies(movies) {
        movieListContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'displayed-movie';
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-details">
                <p>${movie.overview}</p>
                <p>Rating: ${movie.vote_average}</p>
                <button class="add-to-favorites">Add to Favorites</button>
                </div>
            `;
            movieListContainer.appendChild(movieItem);
        });
    }
    
window.onload = fetchMovies;
