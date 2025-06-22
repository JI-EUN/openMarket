import { API_CONFIG } from "../api/config.js";
const accessToken = localStorage.getItem("accessToken");

async function fetchProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const API_URL = `${API_CONFIG.API_URL}/products/${productId}/`;
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const product = await response.json();
      renderProduct(product);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    window.location.href = "/404.html";
  }
}

function renderProduct(product) {
  const container = document.getElementById("product-detail");
  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.product_name}">
    </div>

    <section class="product-info">
      <p class="product-brand">${product.name}</p>
      <h3 class="product-name">${product.info}</h3>
      <p class="product-price"><b>${product.price.toLocaleString()}</b>원</p>
    </section>

    <section class="product-action">
      <h3 class="text-ir">제품구매영역</h3>
      <p class="delivery-info">택배배송 / 배송비 ${product.shipping_fee}</p>
      <div class="quantity">
        <button class="quantity-minus">
          <span class="text-ir">감소</span>
        </button>
        <input id="count" type="number" min="1" max="${
          product.stock
        }" value="1" readonly/>
        <button class="quantity-plus">
          <span class="text-ir">증가</span>
        </button>
      </div>
      <section class="total-price-info">
        <h4>총 상품금액</h4>
        <ul class="total-price">
          <li>총 수량 <span class="primary-color" id="order-num">1</span>개</li>
          <li class="primary-color"><b id="total-price">${product.price.toLocaleString()} </b>원</li>
        </ul>
      </section>
      <div class="buttons">
        <button id="buy-btn" class="primary-btn">바로 구매</button>
        <button class="cart-btn">장바구니</button>
      </div>
    </section>
  `;
  const minusBtn = document.querySelector(".quantity-minus");
  const plusBtn = document.querySelector(".quantity-plus");
  const buyBtn = document.getElementById("buy-btn");
  minusBtn.addEventListener("click", quantityBtn);
  plusBtn.addEventListener("click", quantityBtn);
  buyBtn.addEventListener("click", orderBtn);
}

let originalUnitPrice = null; // 전역 변수
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

function orderBtn() {
  if (accessToken) {
    //로그인 한 상태;
    const itemBrand = document.querySelector(".product-brand").innerHTML;
    const itemName = document.querySelector(".product-name").innerHTML;
    const itemPrice = document
      .querySelector(".product-price b")
      .innerHTML.replace(/[^0-9]/g, "");
    const quantity = document.getElementById("order-num").innerHTML;

    const cartItem = {
      itemBrand: itemBrand,
      itemName: itemName,
      itemPrice: itemPrice,
      quantity: quantity,
    };

    let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    orderList.push(cartItem);
    localStorage.setItem("orderList", JSON.stringify(orderList));
  } else {
    //로그인 안한상태
    const body = document.body;
    const modalPop = document.createElement("div");
    modalPop.classList.add("modal-overlay");
    modalPop.setAttribute("data-target-close", "true");
    modalPop.innerHTML = `
      <article class="modal-popup">
        <!-- 닫기 버튼 -->
        <button class="close-btn icon close-icon" data-target-close="true"><span class="text-ir">닫기</span></button>
        <p>로그인이 필요한 서비스입니다. 로그인 하시겠습니까?</p>
        
        <div class="btns">
          <button class="gray-line-btn btn" data-target-close="true">아니오</button>
          <a href="./login.html" class="primary-btn btn">예</a>
        </div>
    </article>
    `;
    body.append(modalPop);
    document
      .querySelector(".modal-overlay")
      .addEventListener("click", popClose);
    document.addEventListener("keydown", handleEscKey);
  }
}
function popClose(e) {
  if (e.target.hasAttribute("data-target-close")) {
    //닫기
    document.querySelector(".modal-overlay").remove();
  }
}
function handleEscKey(e) {
  if (e.key === "Escape") {
    const modalOverlay = document.querySelector(".modal-overlay");
    if (modalOverlay) {
      // 기존 popClose 함수 재사용
      popClose({ target: modalOverlay });
    }
  }
}

let tabIndex = 0;
const tabBtns = document.querySelectorAll("[data-tab-index]");
const tabContent = document.querySelector(".tab-conent");
tabBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    tabBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    tabIndex = this.getAttribute("data-tab-index");
    showContentForTab(tabIndex);
  });
});

function showContentForTab(index) {
  switch (index) {
    case "0":
      showContent("제품상세 정보가 없습니다.");
      break;
    case "1":
      showContent("리뷰 정보가 없습니다.");
      break;
    case "2":
      showContent("Q&A 정보가 없습니다.");
      break;
    case "3":
      showContent("반품/교환정보 정보가 없습니다.");
      break;
  }
}
function showContent(message) {
  tabContent.textContent = message;
}

fetchProductDetail();
