export function getFavoritesFromLocalStorage() {
    const favorites = localStorage.getItem("favoriteMovies");
    return favorites ? JSON.parse(favorites) : [];
}

export function saveFavoritesToLocalStorage(favorites) {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
}

export function addToFavorites(movie) {
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

export function removeFromFavorites(movieId) {
    let favoriteMovies = getFavoritesFromLocalStorage();
    movieId = parseInt(movieId, 10);
    const movieIndex = favoriteMovies.findIndex((movie) => movie.id === movieId);

    if (movieIndex !== -1) {
        favoriteMovies.splice(movieIndex, 1);
        saveFavoritesToLocalStorage(favoriteMovies);
    } else {
        console.error("Movie with ID", movieId, "not found in favorites.");
    }
}

export function displayFavorites() {
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
            <div class="favorite-movie" data-movie-id="${movie.id}">
                <img src="${movie.poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <button class="remove-favorite" data-movie-id="${movie.id}">Remove</button>
            </div>
        `;
        favoritesContainer.innerHTML += movieElement;
    });

    document.querySelectorAll(".favorite-movie").forEach((movieElement) => {
        const movieId = movieElement.getAttribute("data-movie-id");
        movieElement.addEventListener("click", () => {
            sessionStorage.setItem("selectedMovieId", movieId);
            window.location.href = "./movieInfo.html";
        });
    });

    document.querySelectorAll(".remove-favorite").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const movieId = e.target.getAttribute("data-movie-id");
            removeFromFavorites(movieId);
            displayFavorites();
        });
    });
}
