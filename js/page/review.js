// @ts-nocheck
const API = "http://127.0.0.1:8000"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

fetch(API + `/api/movies/detail/${urlParams.get('movieId')}`)
    .then(res => res.json())
    .then(movies => {
        console.log("trend movies:", movies)

        const meta = document.querySelector(".detail-top .meta");
        movies.genres.forEach(genresArr => {
            meta.innerHTML += `<span>${genresArr}</span>`
        });
        meta.innerHTML += `<span>${src = movies.releaseDate.substring(0, 4)}</span>`
        document.querySelector(".detail-top .poster img").src = movies.posterUrl;
        document.querySelector(".detail-top .title").textContent = movies.title;
        document.querySelector(".detail-top .score strong").textContent = movies.averageRating;
        document.querySelector(".detail-top .summary p").textContent = movies.description;
    })

