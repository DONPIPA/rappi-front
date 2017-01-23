'use strict';

let shopCart = [];

const data = require('./modules/data');
const products = require('./modules/products');
const filters = require('./modules/filters');
const cart = require('./modules/cart');
const order = require('./modules/order');

const cartHandler = {
  set: (target, key, value) => {
    target[key] = value;
    return true;
  },
  get: (target, property) => {
    cart.update();
    return target[property];
  }
};

function init() {
  data.load().then((response) => {
    const globalProducts = response.products;
    const globalCategories = response.categories;

    if (!('Proxy' in window)) {
      alert('Your browser doesnt support Proxies, this could generate errors.');
    } else {
      shopCart = new Proxy([], {
        set: (target, property, value) => {
          target[property] = new Proxy([value], cartHandler);
          cart.update();
          return true;
        },
        get: (target, property) => {
          return target[property];
        },
        deleteProperty: (target, property) => {
          delete target[property];
          cart.update();
          return true;
        }
      });
    }

    products.init(shopCart, globalProducts, globalCategories);
    cart.init(shopCart, globalProducts);
    filters.init(globalCategories);
    order.init(globalProducts);
  });
}

init();
