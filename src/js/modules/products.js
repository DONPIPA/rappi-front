'use strict';

let products;
let categories;
let cart;
let totalProducts = 0;

const categoriesClass = require('./../core/constants').categoriesClass;
const $cart = document.querySelector('.header-cart');

function addToCart(event) {
  const button = event.target;
  const id = button.getAttribute('product-id');
  let product;

  product = {
    id: id,
    quantity: 1
  };

  const exist = cart.filter((productTemp) => {
    return productTemp[0].id === id;
  });

  if (exist[0]) {
    exist[0][0].quantity++;
  } else {
    cart.push(product);
  }

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
  const container = document.querySelector('.products');

  if ('content' in document.createElement('template')) { // check template support
    let template = document.querySelector('#product');

    products.forEach((product) => {
      template.content.querySelector('.product-price').textContent = `$${product.price}`;
      template.content.querySelector('.product-image img').src = product.img;
      template.content.querySelector('.product-name').textContent = product.name;
      template.content.querySelector('.product-details').textContent = product.description;
      template.content.querySelector('.product-button-add').setAttribute('product-id', product.id);
      template.content.querySelector('.product').setAttribute('id', `product-${product.id}`);

      const box = document.importNode(template.content, true);

      product.categories.forEach((category) => {
        const categoryData = categories.find((categoryTemp) => {
          return categoryTemp.categori_id === category;
        });
        const categoryClass = categoriesClass[categoryData.name];
        const icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add('fa-' + categoryClass);
        box.querySelector('.product-categories').appendChild(icon);

        if (!box.querySelector('.product').getAttribute('categories')) {
          box.querySelector('.product').setAttribute('categories', category);
        } else {
          box.querySelector('.product').setAttribute('categories',
              box.querySelector('.product').getAttribute('categories') + ',' + category);
        }
      });

      box.querySelector('.product').setAttribute('available', product.available);
      box.querySelector('.product').setAttribute('not-available', !product.available);
      box.querySelector('.product').setAttribute('best-seller', product.best_seller);
      box.querySelector('.product').setAttribute('price', parseFloat(product.price, 10) * 1000);
      box.querySelector('.product-button-add').addEventListener('click', addToCart);

      container.appendChild(box);
    });
  }
}

function init(shopCart, globalProducts, globalCategories) {
  cart = shopCart;
  products = globalProducts;
  categories = globalCategories;

  generateProducts();
}

module.exports = {
  init: init
};
