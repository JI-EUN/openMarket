const headerNav = document.querySelector('.header-user')
const userType = JSON.parse(localStorage.getItem('userInfo'))?.user_type;
const accessToken = localStorage.getItem('accessToken');

if(!accessToken){
  //비로그인상태
  const loginElem = document.createElement('li');
  loginElem.classList.add('login-link-btn')
  loginElem.innerHTML= `<a href="login.html"><span>로그인</span></a>`;
  headerNav.append(loginElem)
}else{
  //로그인상태
  const logoutElem = document.createElement('li');
  logoutElem.classList.add('login-link-btn')
  logoutElem.innerHTML= `<button onclick="logout()"><span>로그아웃</span></button>`;
  headerNav.append(logoutElem)
  switch (userType) {
    case 'SELLER':
      const sellerCenter = document.createElement('li');
      sellerCenter.classList.add('seller-center-btn')
      sellerCenter.innerHTML= `<a href="/seller-center.html"><span>판매자센터</span></a>`;
      headerNav.append(sellerCenter)
      break;
  }
}


// 로그아웃 함수
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    window.location.href = 'index.html';
}
