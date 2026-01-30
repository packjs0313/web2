const genreRow = document.getElementById("genreRow");
const genreButtons = Array.from(document.querySelectorAll(".genre-btn"));

genreRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".genre-btn");
    if (!btn) return;

    btn.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    const wishBtn = e.target.closest(".wish-btn");
    if (!wishBtn) return;

    e.preventDefault();
    e.stopPropagation();

    wishBtn.classList.toggle("on");
});
