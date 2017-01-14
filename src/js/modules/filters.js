'use strict';

const categoriesClass = require('./../core/constants').categoriesClass;
const button = document.querySelector('.header-button');
const applyButton = document.querySelector('.filters-button-apply');
const container = document.querySelector('.filters-list');
const filtersContainer = document.querySelector('.filters');

let filters = [];

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
    let isShow = true;

    if (filters.length > 0) {
      isShow = categories.reduce((last, category) => {
        return filters.includes(category) || last;
      }, false);

    }

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
}

module.exports = {
  init: init
};
