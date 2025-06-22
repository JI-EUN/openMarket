const API_URL = "https://api.wenivops.co.kr/services/open-market/products/";

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("네트워크 응답 오류");
    }
    const data = await response.json();
    // 응답이 배열일 경우 그대로, 객체일 경우 results 배열을 꺼냄
    const products = Array.isArray(data) ? data : data.results;
    renderProducts(products);
  } catch (error) {
    document.getElementById("product-lists").innerHTML =
      "<li>상품을 불러오는 데 실패했습니다.</li>";
  }
}

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

//swiper
var swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".pagination",
  },
});

// 실행
fetchProducts();
