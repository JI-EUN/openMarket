import { API_CONFIG } from "../api/config.js";

// 현재 선택된 탭 추적
let currentUserType = "BUYER"; // 기본값: 구매자

// 탭 전환 기능
const tabButtons = document.querySelectorAll("[data-login-tab]");

tabButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // 모든 탭에서 on 클래스 제거
    tabButtons.forEach((btn) => btn.classList.remove("on"));
    // 현재 클릭된 탭에 on 클래스 추가
    this.classList.add("on");

    // 현재 선택된 사용자 타입 업데이트
    currentUserType = this.getAttribute("data-login-tab").toUpperCase();
    //console.log('선택된 사용자 타입:', currentUserType);
  });
});

// 로그인 폼 처리
const loginForm = document.getElementById("login-form");
const errorText = document.getElementById("error-text");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("userId").value.trim();
  const password = document.getElementById("userPw").value.trim();

  //input 데이터 체크관련 html error text
  if (!username && !password) {
    showError("아이디를 입력해주세요.");
    return;
  } else if (!password) {
    showError("비밀번호를 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(`${API_CONFIG.API_URL}/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      if (data.user.user_type === currentUserType) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        window.location.href = "./index.html";
      } else {
        showError("로그인정보를 확인해주세요.");
      }
    } else {
      // 에러 메시지 처리
      let errorMessage = "로그인에 실패했습니다.";
      if (data.error) {
        errorMessage = data.error;
      } else if (data.message) {
        errorMessage = data.message;
      }
      showError(errorMessage);
    }
  } catch (error) {
    showError("네트워크 오류가 발생했습니다.");
  }
});

// 에러 메시지 표시
function showError(message) {
  errorText.textContent = message;
  errorText.classList.add("show");
}

// 입력 필드 포커스 시 에러 메시지 숨김
document.getElementById("userId").addEventListener("focus", () => {
  errorText.classList.remove("show");
});
document.getElementById("userPw").addEventListener("focus", () => {
  errorText.classList.remove("show");
});

// 페이지 로드 시 기본 탭 설정 (선택사항)
document.addEventListener("DOMContentLoaded", function () {
  // 첫 번째 탭을 기본으로 활성화
  const firstTab = document.querySelector("[data-login-tab]");
  if (firstTab) {
    firstTab.classList.add("on");
    currentUserType = firstTab.getAttribute("data-login-tab").toUpperCase();
  }
});
