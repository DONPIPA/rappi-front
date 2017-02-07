'use strict';

let categories;
let products;

function getUrl() {
  const hashParameters = window.location.hash.slice(1).split('&');
  let url = false;

  hashParameters.forEach((rawValue) => {
    const value = rawValue.split('=');

    if (value[0] && value[0] === 'url') {
      url = value[1];
    }
  });

  return url;
}

function loadData() {
  const url = getUrl();

  if (url) {
    console.info('Using custom data url:', url);
  } else {
    console.info('Using default data url');
  }

  return fetch((url) ? url : 'data/products.json', {
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
