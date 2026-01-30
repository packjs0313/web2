function toggleReplies(btn) {
        const review = btn.closest('.review');
        const replies = review.querySelector('.replies');
        const text = btn.querySelector('.reply-count');

        if (!replies) return;

        const opened = replies.style.display === 'block';

        if (opened) {
                replies.style.display = 'none';
                text.innerText = '답글 3개';
                btn.classList.remove('open');
        } else {
                replies.style.display = 'block';
                text.innerText = '답글 접기';
                btn.classList.add('open');
        }
}

document.addEventListener('click', function (e) {
        if (e.target.classList.contains('cancel-btn')) {
                const replies = e.target.closest('.replies');
                const review = replies.closest('.review');
                const btn = review.querySelector('.comment-btn');

                replies.style.display = 'none';
                btn.querySelector('.reply-count').innerText = '답글 3개';
                btn.classList.remove('open');
        }
});

// ================= 리뷰 더보기 + 페이지네이션 =================
const reviewsContainer = document.querySelector(".reviews");
const viewMoreBtn = document.querySelector(".view-more");
const paginationEl = document.getElementById("reviewPagination");

// 샘플 데이터 (원하면 더 추가 가능)
const reviewData = [
        { user: "David", star: "★★★★★", text: "오랜 시간 이어진 이야기가 깔끔하게 마무리되어 인상 깊었습니다.<br>또한 희생과 선택의 의미가 자연스럽게 전달되었습니다.", hasReplies: false },
        { user: "Daniel Kim", star: "★★★★☆", text: "압도적인 스케일 속에서도 감정선이 잘 살아 있어 몰입할 수 있었습니다.<br>보고 난 뒤에도 여운이 오래 남는 작품이기도 했습니다.", hasReplies: true },
        { user: "David", star: "★★★★★", text: "연출이 과하지 않고 담백해서 더 좋았어요.<br>특히 후반부가 너무 깔끔했습니다.", hasReplies: false },
        { user: "Yesun Kim", star: "★★★★★", text: "말로 표현하기 힘든 감정이 남는 영화였어요.<br>OST도 장면이랑 너무 잘 맞았습니다.", hasReplies: false },
        { user: "Daniel Kim", star: "★★★★☆", text: "철학적인 질문을 던지면서도 지루하지 않게 끌고 가는 게 좋았습니다.", hasReplies: true },
        { user: "David", star: "★★★★★", text: "액션도 좋았지만 인물 관계가 더 기억에 남았어요.", hasReplies: false },
        { user: "Yesun Kim", star: "★★★★☆", text: "후반부 감정선이 터지는 부분이 최고였습니다.", hasReplies: false },
        { user: "Daniel Kim", star: "★★★★☆", text: "디테일이 많은데도 흐름이 자연스러워서 좋았어요.", hasReplies: true },
        { user: "David", star: "★★★★★", text: "다시 봐도 재밌을 것 같은 영화입니다.", hasReplies: false },
        { user: "Yesun Kim", star: "★★★★★", text: "마지막 장면이 특히 강렬했어요.", hasReplies: false },
        { user: "David", star: "★★★★☆", text: "기대 이상이었습니다.", hasReplies: false },
        { user: "Daniel Kim", star: "★★★★☆", text: "캐릭터 감정이 설득력 있어서 몰입됐습니다.", hasReplies: true },
];

// 페이지 설정
const perPage = 4;       // 한 페이지에 4개씩 (원하면 5~6으로 바꿔도 됨)
let currentPage = 1;

// 기본 리뷰 HTML 생성 (너가 쓰던 구조 그대로)
function makeReviewHTML(item) {
        const avatarSeed = encodeURIComponent(item.user);

        if (!item.hasReplies) {
                return `
        <article class="review">
        <div class="review-top">
                <img src="https://i.pravatar.cc/100?u=${avatarSeed}" alt="User">
                <span class="user">${item.user}</span>
                <span class="star">${item.star}</span>
        </div>
        <p>"${item.text}"</p>
        <div class="review-actions">
                <div class="action-row">
                <div class="action"><img src="images/ui/good.png"><span>3</span></div>
                <div class="action"><img src="images/ui/good.png" class="rotate-180"><span>0</span></div>
                <div class="action"><img src="images/ui/댓글.png"></div>
                </div>
        </div>
        </article>
        `;
        }

        // 답글 있는 리뷰(두번째 댓글 구조 그대로)
        return `
        <article class="review has-replies">
        <div class="review-top">
        <img src="https://i.pravatar.cc/100?u=${avatarSeed}" alt="User">
        <span class="user">${item.user}</span>
        <span class="star">${item.star}</span>
        </div>
        <p>"${item.text}"</p>

        <div class="review-actions">
        <div class="action-row">
                <div class="action"><img src="images/ui/good.png"><span>3</span></div>
                <div class="action"><img src="images/ui/good.png" class="rotate-180"><span>0</span></div>
                <div class="action"><img src="images/ui/댓글.png"></div>
        </div>

        <div class="action comment-btn" onclick="toggleReplies(this)">
                <span class="reply-count">답글 3개</span>
                <img src="images/ui/up.png" class="reply-arrow">
        </div>
        </div>

        <div class="replies">
        <div class="reply-form">
                <img src="https://i.pravatar.cc/100?u=replier" class="reply-profile">
                <input type="text" placeholder="댓글을 입력하세요">
                <button type="button" class="cancel-btn">취소</button>
                <button>답글</button>
        </div>

        <div class="reply">
                <img src="https://i.pravatar.cc/100?u=rep1" class="reply-profile">
                <div class="reply-content">
                <span class="reply-user">David</span>
                <div class="reply-body">맞아요, 여운이 오래 남더라고요.</div>
                </div>
                <div class="reply-actions">
                <img src="images/ui/good.png"><span>1</span>
                <img src="images/ui/good.png" class="rotate-180"><span>0</span>
                <img src="images/ui/댓글.png">
                </div>
        </div>

        <div class="reply">
                <img src="https://i.pravatar.cc/100?u=rep2" class="reply-profile">
                <div class="reply-content">
                <span class="reply-user">Yesun Kim</span>
                <div class="reply-body">연출이 담백해서 더 좋았어요.</div>
                </div>
                <div class="reply-actions">
                <img src="images/ui/good.png"><span>2</span>
                <img src="images/ui/good.png" class="rotate-180"><span>0</span>
                <img src="images/ui/댓글.png">
                </div>
        </div>

        <div class="reply">
                <img src="https://i.pravatar.cc/100?u=rep3" class="reply-profile">
                <div class="reply-content">
                <span class="reply-user">Daniel Kim</span>
                <div class="reply-body">저도 같은 포인트에서 감탄했습니다.</div>
                </div>
                <div class="reply-actions">
                <img src="images/ui/good.png"><span>0</span>
                <img src="images/ui/good.png" class="rotate-180"><span>0</span>
                <img src="images/ui/댓글.png">
                </div>
        </div>
        </div>
        </article>
        `;
}

function renderPage(page) {
        const totalPages = Math.ceil(reviewData.length / perPage);
        currentPage = Math.max(1, Math.min(page, totalPages));

        // 기존에 "더보기로 추가된 리뷰" 싹 지우고 다시 렌더
        document.querySelectorAll(".review.more-added").forEach(el => el.remove());

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const slice = reviewData.slice(start, end);

        // View More 버튼 위에 리뷰들 추가
        const html = slice.map(r => {
                // 더보기로 추가된 애들만 표시용 클래스 부여
                const wrapper = document.createElement("div");
                wrapper.innerHTML = makeReviewHTML(r).trim();
                const article = wrapper.firstElementChild;
                article.classList.add("more-added");
                return article.outerHTML;
        }).join("");

        viewMoreBtn.insertAdjacentHTML("beforebegin", html);
        renderPagination();
}

function renderPagination() {
        const totalPages = Math.ceil(reviewData.length / perPage);

        let buttons = "";
        for (let i = 1; i <= totalPages; i++) {
                buttons += `<button class="${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
        }
        // 마지막 >
        buttons += `<button data-next="1">›</button>`;

        paginationEl.innerHTML = buttons;
        paginationEl.style.display = "flex";
}

// 이벤트
viewMoreBtn.addEventListener("click", () => {
        // 첫 클릭 시 1페이지 보여주고 페이지네이션 표시
        renderPage(1);
        viewMoreBtn.style.display = "none"; // 사진처럼 버튼은 사라지게
});

paginationEl.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        if (btn.dataset.page) {
                renderPage(parseInt(btn.dataset.page, 10));
        } else if (btn.dataset.next) {
                const totalPages = Math.ceil(reviewData.length / perPage);
                const nextPage = (currentPage >= totalPages) ? 1 : (currentPage + 1);
                renderPage(nextPage);
        }

});
