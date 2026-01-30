const API = "http://127.0.0.1:8000";

/* 🔧 공통 카드 생성 */
function renderMovieCard(movie, rank = null) {
  return `
    <article class="movie-card ${rank ? "rank-card" : ""}">
      ${rank ? `<span class="rank-num">${rank}</span>` : ""}
      <a href="review.html?movieId=${movie.id}">
        <img src="${movie.posterUrl || "images/no-poster.png"}">
        <div class="movie-overlay">
          <h4>${movie.title}</h4>
          <div class="text-box">
            <p>${movie.releaseDate || ""}</p>
            <span class="rating">★ ${movie.averageRating ?? 0}</span>
          </div>
        </div>
      </a>
    </article>
  `;
}

/* 🔥 트렌드 */
fetch(API + "/api/movies/trend")
  .then(res => res.json())
  .then(movies => {
    document.getElementById("trendList").innerHTML =
      movies.map(m => renderMovieCard(m)).join("");
  });

/* 🎬 TOP 7 */
fetch(API + "/api/movies/recommended?limit=7")
  .then(res => res.json())
  .then(movies => {
    document.getElementById("top7List").innerHTML =
      movies.map((m, i) => renderMovieCard(m, i + 1)).join("");
  });

/* ⭐ 평점순 */
fetch(API + "/api/movies/recommended")
  .then(res => res.json())
  .then(movies => {
    document.getElementById("ratingList").innerHTML =
      movies.map(m => renderMovieCard(m)).join("");
  });

/* ⏰ 종료 예정 */
fetch(API + "/api/movies/recommended")
  .then(res => res.json())
  .then(movies => {
    document.getElementById("endingList").innerHTML =
      movies.map(m => renderMovieCard(m)).join("");
  });
