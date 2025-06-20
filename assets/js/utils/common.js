// localStorage에서 사용자 정보 불러오기
function getUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
}
// localStorage에서 토큰 불러오기
function getTokens() {
    return {
        access: localStorage.getItem('accessToken'),
        refresh: localStorage.getItem('refreshToken')
    };
}

// 로그인 상태 확인
function isLoggedIn() {
    const tokens = getTokens();
    const userInfo = getUserInfo();
    return !!(tokens.access && userInfo);
}

// 이미 로그인된 사용자인지 확인
window.addEventListener('load', () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        console.log('로그인 확인')
        //window.location.href = 'index.html';
        return;
    }
});

// 로그아웃 함수
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
}




