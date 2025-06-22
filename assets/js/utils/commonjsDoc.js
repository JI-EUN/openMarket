/**
 * @fileoverview 사용자 인증 관련 유틸리티 함수들
 * @description localStorage를 활용한 사용자 정보 및 토큰 관리 기능
 * @author Your Name
 * @version 1.0.0
 */

/**
 * localStorage에서 사용자 정보를 불러옵니다
 * @function getUserInfo
 * @returns {Object|null} 파싱된 사용자 정보 객체 또는 null
 * @description localStorage의 "userInfo" 키에서 JSON 형태로 저장된 사용자 정보를 파싱하여 반환합니다
 * @example
 * const user = getUserInfo();
 * if (user) {
 *   console.log(user.user_type); // "SELLER" 또는 "BUYER"
 * }
 */
function getUserInfo() {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
}

/**
 * localStorage에서 인증 토큰들을 불러옵니다
 * @function getTokens
 * @returns {Object} 토큰 객체
 * @returns {string|null} returns.access - 액세스 토큰
 * @returns {string|null} returns.refresh - 리프레시 토큰
 * @description localStorage에서 accessToken과 refreshToken을 조회하여 객체로 반환합니다
 * @example
 * const tokens = getTokens();
 * if (tokens.access) {
 *   // API 호출 시 Authorization 헤더에 사용
 *   fetch('/api/data', {
 *     headers: { 'Authorization': `Bearer ${tokens.access}` }
 *   });
 * }
 */
function getTokens() {
  return {
    access: localStorage.getItem("accessToken"),
    refresh: localStorage.getItem("refreshToken"),
  };
}

/**
 * 현재 사용자가 로그인된 상태인지 확인합니다
 * @function isLoggedIn
 * @returns {boolean} 로그인 상태 여부
 * @description 액세스 토큰과 사용자 정보가 모두 존재하는지 확인하여 로그인 상태를 판단합니다
 * @example
 * if (isLoggedIn()) {
 *   // 로그인된 사용자만 접근 가능한 기능
 *   showUserDashboard();
 * } else {
 *   // 로그인 페이지로 리다이렉트
 *   window.location.href = 'login.html';
 * }
 */
function isLoggedIn() {
  const tokens = getTokens();
  const userInfo = getUserInfo();
  return !!(tokens.access && userInfo);
}

/**
 * 페이지 로드 시 로그인 상태를 확인하는 이벤트 리스너
 * @description 페이지가 로드될 때 localStorage에서 accessToken을 확인하여 로그인 상태를 콘솔에 출력합니다
 * @example
 * // 페이지 로드 시 자동으로 실행됨
 * // 로그인된 상태라면 콘솔에 "로그인 확인" 메시지 출력
 */
window.addEventListener("load", () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    console.log("로그인 확인");
    // 필요시 메인 페이지로 리다이렉트
    // window.location.href = 'index.html';
    return;
  }
});

/**
 * 사용자 로그아웃을 처리합니다
 * @function logout
 * @description localStorage에서 모든 인증 관련 정보를 제거합니다
 * @example
 * // 로그아웃 버튼 클릭 시
 * document.getElementById('logoutBtn').addEventListener('click', () => {
 *   logout();
 *   window.location.href = 'login.html'; // 로그인 페이지로 리다이렉트
 * });
 */
function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
}
