const headerNav = document.querySelector('.header-user')
const userType = JSON.parse(localStorage.getItem('userInfo'))?.user_type;
const accessToken = localStorage.getItem('accessToken');

if(!accessToken){
  //비로그인상태
  const loginElem = document.createElement('li');
  loginElem.classList.add('sign-link-btn')
  loginElem.innerHTML= `<a href="login.html" class="sign"><span>로그인</span></a>`;
  headerNav.append(loginElem)
}else{
  //로그인상태
  const logoutElem = document.createElement('li');
  logoutElem.classList.add('sign-link-btn')
  logoutElem.innerHTML= `<button onclick="mypagePop(event)" class="sign"><span>마이페이지</span></button>`;
  headerNav.append(logoutElem)
  switch (userType) {
    case 'SELLER':
      const sellerCenter = document.createElement('li');
      sellerCenter.classList.add('seller-center-btn')
      sellerCenter.innerHTML= `<a class="primary-btn" href="/seller-center.html"><span>판매자센터</span></a>`;
      headerNav.append(sellerCenter)
      break;
  }
}



function mypagePop(e){
  const headerPop = document.createElement('ul');
  headerPop.classList.add('header-mypage-lists')
  headerPop.innerHTML = `
    <li><a href="/">마이페이지</a></li>
    <li><button onclick="logout()">로그아웃</button></li>
  `
  if(!e.target.closest('.sign-link-btn').classList.contains('show')){
    e.target.closest('.sign-link-btn').append(headerPop)
  }
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    window.location.href = 'index.html';
}
