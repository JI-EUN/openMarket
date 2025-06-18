const headerNav = document.querySelector('.header_nav01')
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
  console.log(userType)
}


// 로그아웃 함수
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    window.location.href = 'index.html';
}
