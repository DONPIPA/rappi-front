'use strict';

const products = require('./modules/products');
const filters = require('./modules/filters');

function init() {
  products.init();
  filters.init();
}


init();
