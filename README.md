# 🛒 오픈마켓 쇼핑몰 프로젝트

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [파일 디렉토리 구조](#파일-디렉토리-구조)
3. [주요 기능 소개](#주요-기능-소개)
4. [페이지별 상세 기능](#페이지별-상세-기능)

---

## 🎯 프로젝트 개요

**오픈마켓** - [링크](https://darling-salmiakki-5a689c.netlify.app/)

---

## 📁 파일 디렉토리 구조

```
Project Root/
├── 📄 index.html          # 메인 페이지
├── 📄 detail.html         # 상품 상세 페이지
├── 📄 login.html          # 로그인 페이지
├── 📄 signup.html         # 회원가입 페이지
├── 📄 404.html            # 에러 페이지
├── 📄 netlify.toml        # 배포 설정
└── 📁 assets/
    ├── 📁 js/
    │   ├── 📁 components/  # 페이지별 컴포넌트관련 js
    │   │   ├── 📄 index.js
    │   │   ├── 📄 detail.js
    │   │   ├── 📄 login.js
    │   │   ├── 📄 signup.js
    │   │   └── 📄 header.js
    │   ├── 📁 utils/       # 공통 유틸리티
    │   │   └── 📄 common.js
    │   └── 📁 api/         # API 설정
    │       └── 📄 config.js
    ├── 📁 style/
    │   ├── 📁 css/
    │   │   ├── 📄 style.css
    │   │   └── 📄 style.css.map
    │   └── 📄 *.scss       # SCSS 모듈 파일들
    └── 📁 images/          # 이미지 리소스
        ├── 🖼️ Logo-hodu.png
        ├── 🖼️ 배너 이미지들
        └── 🖼️ 아이콘 파일들
```

---

## 🚀 주요 기능 소개

### 🔐 사용자 인증 시스템

- **구매자/판매자 구분**: 탭 기반으로 회원 유형 선택
- **로그인 상태 관리**: 로컬스토리지를 활용한 세션 관리
- **권한별 UI**: 사용자 타입에 따른 차별화된 인터페이스

### 🛍️ 쇼핑 기능

- **상품 목록**: API 연동으로 동적 상품 리스트 렌더링
- **상품 상세**: 개별 상품 ID 기반 상세 정보 표시

---

## 📄 페이지별 상세 기능

## 🏠 메인 페이지 (index.html)

### 📐 Header 컴포넌트

- **동적 헤더 렌더링**

  - 비로그인 상태: 로그인 버튼 표시
  - 로그인 상태: 사용자 타입별 차별화
    - 구매자: 마이페이지 드롭다운
    - 판매자: 판매자 센터 + 마이페이지 드롭다운

- **마이페이지 드롭다운 기능**
  - 드롭다운 팝업 토글
  - 로그아웃 시 로컬스토리지 데이터 완전 삭제

### 🎠 메인 배너

- **Swiper.js 활용**
  - 자동 슬라이드 배너
  - 네비게이션 버튼 및 페이지네이션

### 📦 상품 리스트

- **컴포넌트화된 상품 카드**
  - 재사용 가능한 리스트 스타일 컴포넌트
  - API 데이터 동적 렌더링
  - 상품 클릭 시 상세 페이지 이동

```javascript
// 재사용 가능한 상품 리스트 컴포넌트 예시
function renderProducts(products) {
  const list = document.getElementById("product-lists");
  list.innerHTML = ""; // 초기화

  products.forEach((product) => {
    const item = document.createElement("li");
    item.classList.add("product-list");
    item.innerHTML = `
        <a href="/detail.html?id=${product.id}">
          <div class="img-wrap">
            <img src="${product.image}" alt="">
          </div>
          <div>
            <p class="product-brand">${product.name}</p>
            <p class="product-name">${product.info}</p>
            <p class="product-price"><b>${product.price.toLocaleString()}</b>원</p>
          </div>
        </a>
    `;
    list.appendChild(item);
  });
}
```

---

## 🔍 상품 상세 페이지 (detail.html)

### 🆔 동적 상품 로딩

- **URL 기반 상품 ID 추출**
  - `detail.html?product_id=123` 형태로 상품 구분
  - 잘못된 ID 입력 시 404 페이지 자동 리다이렉트

### 🔢 수량 조절 기능

- **실시간 가격 계산**
  - 수량 버튼 클릭 시 하단 총 가격 자동 업데이트
  - 최소 수량 1개 보장

```javascript
// 수량 변경 시 가격 업데이트
function quantityBtn(event) {
  const countInput = document.getElementById("count");
  let currentValue = parseInt(countInput.value);
  const orderNum = document.getElementById("order-num");

  if (originalUnitPrice === null) {
    const priceText = document.getElementById("total-price").innerHTML;
    originalUnitPrice = parseInt(priceText.replace(/[^0-9]/g, ""));
  }

  if (
    event.target.classList.contains("quantity-minus") &&
    countInput.value > 1
  ) {
    countInput.value = currentValue - 1;
    orderNum.innerHTML = countInput.value;
    const totalPrice = originalUnitPrice * countInput.value;
    document.getElementById(
      "total-price"
    ).innerHTML = `${totalPrice.toLocaleString()}`;
  } else if (event.target.classList.contains("quantity-plus")) {
    countInput.value = currentValue + 1;
    orderNum.innerHTML = countInput.value;
    const totalPrice = originalUnitPrice * countInput.value;
    document.getElementById(
      "total-price"
    ).innerHTML = `${totalPrice.toLocaleString()}`;
  }
}
```

### 📋 상품 정보 탭

- **탭 기반 정보 표시**
  - 제품상세, 리뷰, Q&A, 반품/교환정보
  - 클릭 시 해당 정보로 동적 변경
  - 활성 탭 스타일링

### 🛒 구매 기능

- **로그인 상태 체크**
  - 비로그인 시: 로그인 모달 팝업

---

## 🔐 로그인 모달 팝업

### ⌨️ 키보드 인터랙션

- **ESC 키 지원**
  - ESC 버튼 누를 시 모달 창 자동 닫기
  - 사용자 편의성 향상

---

## 🔑 로그인 페이지 (login.html)

### 🏷️ 회원 구분 탭

- **데이터셋 기반 구분**
  ```html
  <button type="button" class="on" data-login-tab="buyer">
    구매회원 로그인
  </button>
  <button type="button" data-login-tab="seller">판매회원 로그인</button>
  ```

### 🚨 에러 처리 시스템

1. **입력란 공란 체크**

   - "아이디를 입력해주세요."

2. **부분 입력 체크**

   - "비밀번호를 입력해주세요." (아이디만 입력)
   - "아이디를 입력해주세요." (비밀번호만 입력)

3. **인증 실패**

   - "아이디 또는 비밀번호가 일치하지 않습니다."

4. **회원 구분 불일치**
   - "로그인정보를 확인해주세요."

---

## ✍️ 회원가입 페이지 (signup.html)

### 👥 회원 구분별 폼

- **동적 입력란 추가**
  - 구매회원: 기본 정보만
  - 판매회원: 사업자 정보 추가 (상호명, 사업자등록번호)

### 🔒 비밀번호 검증 시스템

강력한 비밀번호 정책 적용:

1. **길이 검증**: 8자 이상
2. **문자 포함**: 영소문자 최소 1개
3. **일치 확인**: 비밀번호 재확인 필드와 동일성 체크

```javascript
// 비밀번호 유효성 검사
function validatePassword(password) {
  const minLength = password.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);

  return {
    isValid: minLength && hasLowerCase,
    errors: {
      length: !minLength ? "비밀번호는 8자 이상이어야 합니다." : null,
      lowercase: !hasLowerCase ? "영소문자를 포함해야 합니다." : null,
    },
  };
}
```

### 🔍 중복 확인 기능

- **아이디 중복 확인**

  - 실시간 API 호출로 중복 체크
  - 사용 가능/불가능 상태 표시

- **사업자등록번호 인증**
  - 판매회원 전용 인증 버튼
  - 사업자등록번호 유효성 검증

### ✅ 약관 동의

- **체크박스 기반 동의**
  - 이용약관 및 개인정보처리방침 동의 필수
  - 체크 시 가입하기 버튼 활성화
  - 미체크 시 버튼 비활성화 상태 유지

---

## ❌ 404 에러 페이지 (404.html)

### 🔄 자동 리다이렉트

- **잘못된 상품 ID 접근**
  - `detail.html?product_id=invalid` 형태 접근 시
  - 존재하지 않는 상품 ID 감지 시 자동 이동

### 🌐 Netlify 배포 최적화

```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

- 모든 잘못된 경로 접근 시 404 페이지로 리다이렉트
- 서버 수준에서 에러 핸들링

### 🧭 사용자 친화적 네비게이션

- **메인으로 돌아가기**: 홈페이지 바로가기 버튼
- **이전 페이지**: `history.go(-2)` 함수로 이전 페이지 이동
- 깔끔하고 직관적인 에러 메시지
