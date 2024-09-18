const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function getMovieDetails(id) {
    const url = `https://api.tvmaze.com/shows/${id}`;
    try {
        const response = await axios.get(url);
        const movieData = response.data;
        displayMovieDetails(movieData);
    } catch (error) {
        window.location.href = "./error.html";
    }
}

function displayMovieDetails(movieData) {
    const detailsContainer = document.querySelector('.movie-container');

    const detailsHTML = `
        <h1>  </h1>
        <div class="film-details">
            <img class="details-img" src="${movieData.image.original}" alt="${movieData.name}">
            <div class="summary">
                <div class="summary-content">${movieData.summary}</div>
                <div class="expand-details">
                    <div class="detail-item">
                        <p>Genres: ${movieData.genres.join(', ')}</p>
                    </div>
                    <div class="detail-item">
                        <p>Rating: ${movieData.rating.average}</p>
                    </div>
                    <div class="detail-item">
                        <p>Country: ${movieData.network.country.name}</p>
                    </div>
                    <div class="detail-item">
                        <p>Date: ${movieData.premiered}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    detailsContainer.innerHTML = detailsHTML;
}

getMovieDetails(id);
