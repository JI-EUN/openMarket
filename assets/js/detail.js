async function fetchProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  if (!productId) {
    document.getElementById('product-detail').textContent = '상품 ID가 없습니다.';
    return;
  } 
  const API_URL = `https://api.wenivops.co.kr/services/open-market/products/${productId}/`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('API 응답 오류');
    }
    const product = await response.json();
    renderProduct(product);
  } catch (error) {
    console.error('상세 정보 가져오는 중 오류:', error);
    document.getElementById('product-detail').textContent = '상품 정보를 불러오지 못했습니다.';
  }
}

function renderProduct(product) {
  const container = document.getElementById('product-detail');
  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.product_name}">
    </div>
    <div class="product-info">
      <p>백엔드크로브</p>
      <h2>${product.info}</h2>
      <p class="product-price"><b>${product.price.toLocaleString()}</b>원</p>
    </div>
    <div class="product-action">
      <div class="delivery">택배배송 / 무료배송</div>
      <div class="quantity">
        <label for="count">수량:</label>
        <input id="count" type="number" value="1" min="1" style="width: 50px;" />
      </div>
      <div class="total-price">
        총 수량 1개 / <span>17,500원</span>
      </div>
      <div class="buttons">
        <button class="buy-btn primary-btn">바로 구매</button>
        <button class="cart-btn">장바구니</button>
      </div>
    </div>
  `;
}

fetchProductDetail();