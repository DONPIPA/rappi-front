'use strict';

const categoriesClass = require('./../core/constants').categoriesClass;
const button = document.querySelector('.header-button');
const applyButton = document.querySelector('.filters-button-apply');
const container = document.querySelector('.filters-list');
const filtersContainer = document.querySelector('.filters');
const customFiltersButtons = document.querySelectorAll('.filter-custom');

let customFilters = {};
let filters = [];
let priceFilter = {};

function addCustomFilter(event) {
  const button = event.target;
  const filter = {
    name: button.getAttribute('custom-filter'),
    value: button.getAttribute('filter-value'),
    price: button.getAttribute('filter-price'),
    type: button.getAttribute('filter-type')
  };

  if (filter.name === 'price') {
    if (!priceFilter[filter.price]) {
      priceFilter[filter.price] = {
        type: filter.type,
        price: filter.price
      };
    } else {
      delete priceFilter[filter.price];
    }
  } else {
    if (!customFilters[filter.name]) {
      customFilters[filter.name] = filter.value;
    } else if (customFilters[filter.name] !== filter.value) {
      customFilters[filter.name] = filter.value
    } else {
      delete customFilters[filter.name];
    }
  }

  console.log(priceFilter);

  button.classList.toggle('is-selected');
}

function addFilter(event) {
  const button = event.target;
  const category = button.getAttribute('filter-id');

  button.classList.toggle('is-selected');

  if (!filters.includes(category)) {
    filters.push(category);
  } else {
    filters.splice(filters.indexOf(category), 1);
  }
}

function applyFilters() {
  const products = document.querySelectorAll('.product');

  products.forEach((product) => {
    const categories = product.getAttribute('categories').split(',');
    let isShowCategories = false;
    let isShowCustom = false;
    let isShowPrice = false;
    let isShow = true;

    if (filters.length > 0) {
      isShowCategories = categories.reduce((last, category) => {
        return filters.includes(category) || last;
      }, false);
    }

    if (Object.keys(customFilters).length > 0) {
      isShowCustom = Object.keys(customFilters).reduce((last, filter) => {
        const value = product.getAttribute(filter);
        return value === customFilters[filter] || last;
      }, false);
    }

    if (Object.keys(priceFilter).length > 0) {
      isShowPrice = Object.keys(priceFilter).reduce((last, filter) => {
        const value = product.getAttribute('price');

        console.log(value, filter);

        if (priceFilter[filter] === '>') {
          return value >= filter;
        } else {
          return value <= filter;
        }
      }, false);
    } else {
      isShowPrice = true;
    }

    isShow = isShowCategories || isShowCustom || isShowPrice;

    if (isShow) {
      product.classList.remove('is-hide');
    } else {
      product.classList.add('is-hide');
    }
  });
}

function createFilters() {
  if (!container.classList.contains('loaded')) {
    let template = document.querySelector('#filter');

    window.categories.forEach((category) => {
      template.content.querySelector('.filter-label').textContent = category.name;

      const box = document.importNode(template.content, true);

      const icon = document.createElement('i');

      icon.classList.add('fa');
      icon.classList.add('fa-' + categoriesClass[category.name]);

      box.querySelector('.filter-icon').appendChild(icon);
      box.querySelector('.filter').setAttribute('filter-id', category.categori_id);

      box.querySelector('.filter').addEventListener('click', addFilter);

      container.appendChild(box);
    });

    container.classList.add('loaded');
  }

  filtersContainer.classList.remove('is-hide');
}

function init() {
  button.addEventListener('click', createFilters);
  applyButton.addEventListener('click', applyFilters);

  customFiltersButtons.forEach((buttonFilter) => {
    buttonFilter.addEventListener('click', addCustomFilter);
  });
}

module.exports = {
  init: init
};
