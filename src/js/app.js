'use strict';

const $cart = document.querySelector('.header-cart');
const categoriesClass = {
  'drinks': 'glass',
  'lunch': 'cutlery',
  'food': 'apple',
  'sea': 'tint'
};
let products;
let categories;
let cart = [];

function addToCart(event) {
  const button = event.target;
  const id = button.getAttribute('product-id');

  if (!cart[id]) {
    cart[id] = {
      id: id,
      quantity: 1
    };
  } else {
    cart[id].quantity++;
  }

  $cart.setAttribute('count', cart.length);

  if (cart.length > 0) {
    $cart.classList.remove('empty');
  } else {
    $cart.classList.add('empty');
  }
}

function findCategory(category) {
  return category.categori_id === this;
}

function generateProducts() {
  const container = document.querySelector('.products');

  if ('content' in document.createElement('template')) { // check template support
    let template = document.querySelector('#product');

    products.forEach((product, index) => {
      template.content.querySelector('.product-price').textContent = '$' + product.price;
      template.content.querySelector('.product-image img').src = product.img;
      template.content.querySelector('.product-name').textContent = product.name;
      template.content.querySelector('.product-details').textContent = product.description;
      template.content.querySelector('.product-button-add').setAttribute('product-id', index);

      const box = document.importNode(template.content, true);

      product.categories.forEach((category) => {
        const categoryData = categories.find(findCategory, category);
        const categoryClass = categoriesClass[categoryData.name];
        const icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add('fa-' + categoryClass);
        box.querySelector('.product-categories').appendChild(icon);
      });


      box.querySelector('.product-button-add').addEventListener('click', addToCart);

      container.appendChild(box);
    });
  }
}

function loadData() {
  fetch('data/products.json', {
    method: 'get'
  }).then((response) => {
    if (response.status !== 200) {
      console.error('ERROR, status code:', response.status);
      return false;
    }

    response.json().then((data) => {
      categories = data.categories;
      products = data.products;

      generateProducts();
    });
  }).catch((error) => {
    console.error('ERROR', error);
    return false;
  });
}

function init() {
  loadData();
}

init();
