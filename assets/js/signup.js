import { API_CONFIG } from './config.js';
const tabButtons = document.querySelectorAll('[data-login-tab]');
const signupBtn = document.querySelector('.signup-btn')
const inputAll = document.querySelectorAll('input');  
const agreeBox = document.getElementById('agree-box');
let currentUserType = 'BUYER'; // 기본값: 구매자



// 탭 전환 기능
tabButtons.forEach(button => {
  button.addEventListener('click', function() {
    tabButtons.forEach(btn => btn.classList.remove('on'));
    this.classList.add('on');
    currentUserType = this.getAttribute('data-login-tab').toUpperCase();
    tabContent(currentUserType)
  });
});

function tabContent(currentUserType){
  if(currentUserType ==='SELLER'){
    const signForm = document.getElementById('signupForm');
    const bizNumWrap = document.createElement('div');
    bizNumWrap.classList.add('form-group','seller-only');
    bizNumWrap.innerHTML=`
      <label for="biz-num">사업자 등록번호</label>
        <input type="text" id="biz-num" name="company_registration_number"/>
        <button class="primary-btn" id="biz-check-btn" type="button">인증</button>
      <p class="biz-check-text"></p>
    `
    const storeNameWrap =  document.createElement('div');
    storeNameWrap.classList.add('form-group','seller-only');
    storeNameWrap.innerHTML = `
      <label for="store-name">스토어 이름</label>
      <input type="text" id="store-name" name="store_name"/>
    `
    signForm.append(bizNumWrap, storeNameWrap);

    // 이벤트 리스너 추가
    const bizCheckBtn = document.getElementById('biz-check-btn');
    bizCheckBtn.addEventListener('click', bizCheck);
  }else{
    const sellerInputs = document.querySelectorAll('.seller-only');
    sellerInputs.forEach(sellerinput=>{
      sellerinput.remove();
    })
  }
}

//폼 빈값 확인
function formValueCheck() {
  let allFilled = true;
  // 동의 체크박스도 확인
  if (!agreeBox.checked) {
    allFilled = false;
  }
  // 버튼 활성화/비활성화
  signupBtn.disabled = !allFilled;
}



//아이디 중복확인
document.getElementById('id-check-btn').addEventListener('click', async function(){
  const usernameInput = document.getElementById('signup-id')
  const username = usernameInput.value;
  try{
    const response = await fetch(`${API_CONFIG.API_URL}${API_CONFIG.ENDPOINTS.ID_CHECK}`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: username,
      })
    });        
    const data = await response.json();
    if (response.ok) {
      // 아이디 별탈 문제 없음
      const inputWrap =  usernameInput.closest('.form-group');
      inputWrap.classList.remove('id-check-error');
      inputWrap.classList.add('id-check-ok');
      formCheckText(data.message)
    } else {
      const inputWrap =  usernameInput.closest('.form-group');
      inputWrap.classList.remove('id-check-ok');
      inputWrap.classList.add('id-check-error');
      formCheckText(data.error)
    }
  }catch(error){
    console.log(error)
  }
})

//formCheckText
function formCheckText(text){
  const checkText = document.querySelector('.id-check');
  checkText.innerHTML= text;
}

//사업자등록번호확인
async function bizCheck(){
  const bizNumInput = document.getElementById('biz-num')
  const company_registration_number = bizNumInput.value;
  try{
    const response = await fetch(`${API_CONFIG.API_URL}${API_CONFIG.ENDPOINTS.BIZ_CHECK}`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_registration_number,
      })
    });        
    const data = await response.json();
    if (response.ok) {
      // 아이디 별탈 문제 없음
      const inputWrap =  bizNumInput.closest('.form-group');
      inputWrap.classList.remove('id-check-error');
      inputWrap.classList.add('id-check-ok');
      const checkText = document.querySelector('.biz-check-text');
      checkText.innerHTML= data.message;
    } else {
      const inputWrap =  bizNumInput.closest('.form-group');
      inputWrap.classList.remove('id-check-ok');
      inputWrap.classList.add('id-check-error');
      const checkText = document.querySelector('.biz-check-text');
      checkText.innerHTML= data.error;
    }
  }catch(error){
    console.log(error)
  }
}

// 공통 필드 데이터 수집
function getCommonFormData() {
    const username = document.getElementById('signup-id').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;
    const phoneNumberFirst = document.getElementById('phone-number-front').value;
    const phoneNumberMiddle = document.getElementById('phone-number-middle').value;
    const phoneNumberBehind = document.getElementById('phone-number-behind').value;
    const phone_number = `${phoneNumberFirst}${phoneNumberMiddle}${phoneNumberBehind}`;
  
    return {
        username,
        password,
        name,
        phone_number
    };
}

// 판매자 전용 필드 데이터 수집
function getSellerFormData() {
    const company_registration_number = document.getElementById('biz-num').value;
    const store_name = document.getElementById('store-name').value;
    return {
      company_registration_number,
      store_name
    };
}


function prepareApiData(commonData, sellerData = null, userType) {
    let apiData = {
        username: commonData.username,
        password: commonData.password,
        name: commonData.name,
        phone_number: commonData.phone_number
    };
    
    // 판매자인 경우 추가 필드 포함
    if (userType === 'SELLER' && sellerData) {
        apiData.company_registration_number = sellerData.company_registration_number;
        apiData.store_name = sellerData.store_name;
    }
    
    return apiData;
}


signupBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const errorMessages  = document.querySelectorAll('.error-message')
  errorMessages.forEach(errorMsg => {
    errorMsg.remove();
  });
  const commonFormData = getCommonFormData();
  let sellerFormData = null;
  if (currentUserType === 'SELLER') {
      sellerFormData = getSellerFormData();
  }
  // API 요청 데이터 준비
  const apiData = prepareApiData(commonFormData, sellerFormData, currentUserType);
  let apiSignType = currentUserType.toLowerCase();
  try{
    const response = await fetch(`${API_CONFIG.API_URL}/accounts/${apiSignType}/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData)
    });
    const data = await response.json();
    if (response.ok) {
        // 회원가입 성공
        alert('회원가입이 완료되었습니다!');
        // window.location.href = '/login';
    } else {
        // 회원가입 실패 - 에러 메시지 처리
        handleApiError(data);
    }
  }catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
      if (error.status === 400) {
        handleValidationErrors(error.data);
      }
  }
})

function handleApiError(errorData) {
  for (let key in errorData) {
    // name 속성이 key와 일치하는 input 찾기
    const input = document.querySelector(`input[name="${key}"]`);
    if (input) {
      // input의 부모 요소 (.form-group) 찾기
      const parentElement = input.closest('.form-group');
      const errorText = document.createElement('p')
      errorText.classList.add('error-message');
      errorText.innerHTML = errorData[key][0];
      parentElement.appendChild(errorText)
    }
  }
}

function clearErrorMessage(input) {
  const parentElement = input.closest('.form-group');
  if (parentElement) {
    // 해당 부모 요소 내의 모든 에러 메시지 제거
    const errorMessages = parentElement.querySelectorAll('.error-message');
    errorMessages.forEach(errorMsg => {
      errorMsg.remove();
    });
  }
}

function addFocusEventListeners() {
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      clearErrorMessage(this);
    });
  });
}


document.addEventListener('DOMContentLoaded', function() {
  //form 버튼활성화
  agreeBox.addEventListener('change', formValueCheck);
  // 초기 실행
  formValueCheck();
  //input-wrap errortext 지우기
  addFocusEventListeners();
});
