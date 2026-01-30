fetch("header.html")
    .then(res => res.text())
    .then(html => {
        document.querySelector("header").innerHTML = html;

        // ✅ header가 DOM에 붙은 뒤에 실행
        const userMenu = document.querySelector(".user-menu");

        fetch("http://127.0.0.1:8000/api/auth/me", {
            credentials: "include"
        })
            .then(res => {
                if (res.status === 401) return null;
                return res.json();
            })
            .then(user => {
                if (user) {
                    // ✅ 로그인 상태
                    userMenu.innerHTML = `
            <a href="mypage.html">
              ${user.nickname}
              <img src="${user.img ?? 'images/ui/default-user.png'}">
            </a>
          `;

                    document.getElementById("logoutBtn").onclick = () => {
                        fetch("http://127.0.0.1:8000/api/auth/logout", {
                            method: "POST",
                            credentials: "include"
                        }).then(() => location.reload());
                    };

                } else {
                    // ✅ 비로그인 상태
                    userMenu.innerHTML = `
            <a href="login.html">로그인</a>
            <a href="join.html">회원가입</a>
          `;
                }
            });
    });