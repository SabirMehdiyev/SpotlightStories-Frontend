let movieCards = document.querySelector(".movie-cards");
let btn = document.querySelector("#viewMoreBtn");
let searchBtn = document.querySelector(".fa-magnifying-glass");
let searchInp = document.querySelector("#search-input");
let carousel = $('.owl-carousel');
let searchQuery = "";
let json = [];
let filteredMovies = [];
let skip = 0;
let lastIndex = 12;

$(document).ready(function () {
    carousel.owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 2500,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
});

async function getData() {
    const url = "https://api.tvmaze.com/shows";
    try {
        const response = await fetch(url);
        json = await response.json();
        filteredMovies = json;
    } catch (error) {
        alert("Data not found");
    }
};

function displayData(skip, lastIndex) {
    filteredMovies.slice(skip, lastIndex).forEach(item => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <div class="details-mask">
                <a href="./details.html?id=${item.id}" class="detailsBtn">Details <i class="fa-solid fa-arrow-up"></i></a>
            </div>
            <div class="movie-rating">
                <i class="fa-solid fa-star"></i> ${item.rating.average} / 10
            </div>
            <img src="${item.image.medium}" class="movie-card-img" alt="${item.name}">
        `;
        movieCards.appendChild(movieCard);
    });
}

function displaySlider(){
    json.slice(0, 20).forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('item');

        carouselItem.innerHTML = `
            <img src="${item.image.medium}" alt="${item.name}">
                <div class="slide-content">
                    <div class="tags">
                        <span class="tag">${item.genres[0]}</span>
                        <span class="tag">${item.genres[1]}</span>
                    </div>
                    <div class="movie-title"><a href="./details.html?id=${item.id}">${item.name}</a></div>
                    <div class="rating">
                        <i class="fa-solid fa-star"></i> ${item.rating.average} / 10
                    </div>
                </div>
        `;

        carousel.trigger('add.owl.carousel', [$(carouselItem)]).trigger('refresh.owl.carousel');
    });
}

async function displayMovies() {
    await getData();
    displayData(skip, lastIndex);
    displaySlider();
}

btn.addEventListener("click", function () {
    skip = lastIndex;
    lastIndex += 8;
    displayData(skip, lastIndex)
});

searchBtn.addEventListener("click", () => {
    movieCards.innerHTML = "";
    searchQuery = searchInp.value.trim();
    skip = 0;  
    lastIndex = 12;  

    if (searchQuery) {
        filteredMovies = json.filter(movie => movie.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
        filteredMovies = json;
    }

    displayData(skip, lastIndex);
});

displayMovies();
