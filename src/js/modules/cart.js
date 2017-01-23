'use strict';

let cart;
let products;
let throttle = false;
let totalProducts = 0;

const container = document.querySelector('.cart');
const $button = document.querySelector('.header-cart');
const $cart = document.querySelector('.header-cart');
const $cartBox = document.querySelector('.cart');

function deleteProduct(event) {
  const id = event.target.getAttribute('cart-id');

  delete cart[id];

  totalProducts = 0;

  cart.forEach((productTemp) => {
    totalProducts += productTemp[0].quantity;
  });

  $cart.setAttribute('count', totalProducts);

  if (totalProducts > 0) {
    $cart.classList.remove('empty');
  } else {
    $cart.classList.add('empty');
  }
}

function generateProducts() {
  if (!throttle) {
    throttle = true;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    if ('content' in document.createElement('template')) { // check template support
      let template = document.querySelector('#cart-product');

      cart.forEach((productTemp, index) => {
        if (productTemp[0]) {
          const product = productTemp[0];
          const productData = products.find((productFind) => {
            return productFind.id === parseInt(product.id);
          });

          template.content.querySelector('.cart-product-quantity').textContent = product.quantity;
          template.content.querySelector('.cart-product-image img').src = productData.img;
          template.content.querySelector('.cart-product-name').textContent = productData.name;

          const box = document.importNode(template.content, true);

          box.querySelector('.cart-product-delete').addEventListener('click', deleteProduct);
          box.querySelector('.cart-product-delete').setAttribute('cart-id', index);

          container.appendChild(box);
        }
      });
    }

    throttle = false;
  }
}

function openCart() {
  generateProducts();

  $cartBox.classList.toggle('is-show');
}

function init(shopCart, globalProducts) {
  cart = shopCart;
  products = globalProducts;

  $button.addEventListener('click', openCart);
  console.log('cart init');
}

module.exports = {
  init: init,
  update: generateProducts
};
