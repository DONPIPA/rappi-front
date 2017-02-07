'use strict';

let products;
let $searchInput;

function searchProducts() {
  const searchValue = $searchInput.value.toLowerCase();

  products.forEach((product) => {
    const regExp = new RegExp(searchValue);
    const productName = product.name.toLowerCase();
    const isShow = regExp.test(productName);
    const $box = document.querySelector(`#product-${product.id}`);

    if (isShow) {
      $box.classList.remove('is-hide');
    } else {
      $box.classList.add('is-hide');
    }
  });
}

function init(globalProducts) {
  products = globalProducts;

  $searchInput = document.querySelector('.order-search-input');

  $searchInput.addEventListener('keyup', searchProducts);
}

module.exports = {
  init: init
};
