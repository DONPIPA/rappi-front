'use strict';

let categories;
let products;

function loadData() {
  return fetch('data/products.json', {
    method: 'get'
  }).then((response) => {
    if (response.status !== 200) {
      console.error('ERROR, status code:', response.status);
      return false;
    }

    return response.json().then((data) => {
      categories = data.categories;
      products = data.products;

      return {
        categories: categories,
        products: products
      };
    });
  }).catch((error) => {
    console.error('ERROR', error);
    return false;
  });
}

module.exports = {
  load: loadData
};
