let currentUserType = 'BUYER'; // 기본값: 구매자
const tabButtons = document.querySelectorAll('[data-login-tab]');
const signupBtn = document.querySelector('.signup-btn')



// 탭 전환 기능
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 모든 탭에서 on 클래스 제거
        tabButtons.forEach(btn => btn.classList.remove('on'));
        // 현재 클릭된 탭에 on 클래스 추가
        this.classList.add('on');
        // 현재 선택된 사용자 타입 업데이트
        currentUserType = this.getAttribute('data-login-tab').toUpperCase();
    });
});



signupBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const name = document.getElementById('signup-name').value;
  const phoneNumberFirst = document.getElementById('phone-number-front').value;
  const phoneNumberMiddle = document.getElementById('phone-number-middle').value;
  const phoneNumberBehind = document.getElementById('phone-number-behind').value;
  const phone_number = `${phoneNumberFirst}${phoneNumberMiddle}${phoneNumberBehind}`
  let apiSignType = currentUserType.toLowerCase()
  try {
      const response = await fetch(`${baseUrl}accounts/${apiSignType}/signup/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: username,
              password: password,
              name: name,
              phone_number: phone_number
          })
      });
      const data = await response.json();
      
      if (response.ok) {
          setTimeout(() => {
              switchTab('login');
              // 회원가입한 아이디를 로그인 폼에 자동 입력
              document.getElementById('login-username').value = username;
          }, 2000);
      } else {
          // 회원가입 실패 - 에러 메시지 처리
          let errorMessage = '';
          if (typeof data === 'string') {
              errorMessage = data;
          } else if (data.error) {
              errorMessage = data.error;
          } else {
              // 필드별 에러 메시지 처리
              const errors = [];
              for (const [field, messages] of Object.entries(data)) {
                  if (Array.isArray(messages)) {
                      errors.push(...messages);
                  } else {
                      errors.push(messages);
                  }
              }
              errorMessage = errors.join('<br>');
          }
          messageDiv.innerHTML = `<div class="error-message">${errorMessage}</div>`;
      }
  } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
      messageDiv.innerHTML = '<div class="error-message">서버 연결에 실패했습니다.</div>';
  }
});


// 에러 메시지 표시
function showError(message) {
  errorText.textContent = message;
  errorText.classList.add('show');
}