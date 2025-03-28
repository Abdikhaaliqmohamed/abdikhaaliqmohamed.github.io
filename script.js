document.getElementById('searchButton').addEventListener('click', searchMovies);

async function searchMovies() {
    const query = document.getElementById('searchInput').value;
    if (!query) {
        alert('Please enter a movie title.');
        return;
    }

    const apiKey = 'e72bb51b'; 
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            alert(data.Error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch movie data.');
    }
}

function displayMovies(movies) {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <a href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank">View on IMDb</a>
        `;

        container.appendChild(movieElement);
    });
}
