const headerNav = document.querySelector(".header-user");
const userType = JSON.parse(localStorage.getItem("userInfo"))?.user_type;
const accessToken = localStorage.getItem("accessToken");

if (!accessToken) {
  //비로그인상태
  const loginElem = document.createElement("li");
  loginElem.classList.add("sign-link-btn");
  loginElem.innerHTML = `<a href="login.html" class="sign"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.6663 28V25.3333C26.6663 23.9188 26.1044 22.5623 25.1042 21.5621C24.104 20.5619 22.7475 20 21.333 20H10.6663C9.25185 20 7.8953 20.5619 6.8951 21.5621C5.89491 22.5623 5.33301 23.9188 5.33301 25.3333V28" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.0003 14.6667C18.9458 14.6667 21.3337 12.2789 21.3337 9.33333C21.3337 6.38781 18.9458 4 16.0003 4C13.0548 4 10.667 6.38781 10.667 9.33333C10.667 12.2789 13.0548 14.6667 16.0003 14.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span>로그인</span></a>`;
  headerNav.append(loginElem);
} else {
  //로그인상태
  const logoutElem = document.createElement("li");
  logoutElem.classList.add("sign-link-btn");
  logoutElem.innerHTML = `<button onclick="mypagePop(event)" class="sign"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.6663 28V25.3333C26.6663 23.9188 26.1044 22.5623 25.1042 21.5621C24.104 20.5619 22.7475 20 21.333 20H10.6663C9.25185 20 7.8953 20.5619 6.8951 21.5621C5.89491 22.5623 5.33301 23.9188 5.33301 25.3333V28" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.0003 14.6667C18.9458 14.6667 21.3337 12.2789 21.3337 9.33333C21.3337 6.38781 18.9458 4 16.0003 4C13.0548 4 10.667 6.38781 10.667 9.33333C10.667 12.2789 13.0548 14.6667 16.0003 14.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span>마이페이지</span></button>`;
  headerNav.append(logoutElem);
  switch (userType) {
    case "SELLER":
      const sellerCenter = document.createElement("li");
      sellerCenter.classList.add("seller-center-btn");
      sellerCenter.innerHTML = `<a class="primary-btn" href="/seller-center.html"><span>판매자센터</span></a>`;
      headerNav.append(sellerCenter);
      break;
  }
}

function mypagePop(e) {
  const headerPop = document.createElement("ul");
  headerPop.classList.add("header-mypage-lists");
  headerPop.innerHTML = `
    <li><a href="/">마이페이지</a></li>
    <li><button onclick="logout()">로그아웃</button></li>
  `;
  if (!e.target.closest(".sign-link-btn").classList.contains("show")) {
    e.target.closest(".sign-link-btn").append(headerPop);
  }
}

// 로그아웃 함수
function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
  window.location.href = "index.html";
}
