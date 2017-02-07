'use strict';

let products;
let order = {
  type: null,
  direction: null
};

const $buttons = document.querySelectorAll('.order-sort-icon');

function nameASC(productA, productB) {
  const nameA = productA.name.toUpperCase();
  const nameB = productB.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  }

  return 0;
}

function nameDES(productA, productB) {
  const nameA = productA.name.toUpperCase();
  const nameB = productB.name.toUpperCase();

  if (nameA < nameB) {
    return 1;
  } else if (nameA > nameB) {
    return -1;
  }

  return 0;
}

function priceASC(productA, productB) {
  const priceA = parseFloat(productA.price, 10) * 1000;
  const priceB = parseFloat(productB.price, 10) * 1000;

  if (priceA > priceB) {
    return 1;
  } else if (priceA < priceB) {
    return -1;
  }

  return 0;
}

function priceDES(productA, productB) {
  const priceA = parseFloat(productA.price, 10) * 1000;
  const priceB = parseFloat(productB.price, 10) * 1000;

  if (priceA < priceB) {
    return 1;
  } else if (priceA > priceB) {
    return -1;
  }

  return 0;
}

function setOrder(arrayOrder) {
  arrayOrder.forEach((product, index) => {
    const $box = document.querySelector(`#product-${product.id}`);

    $box.style.order = index;
  });
}

function sortProducts(event) {
  const $currentButton = event.target;
  const $icon = $currentButton.querySelector('.fa');

  let iconClass = '';
  let array;

  $buttons.forEach(($button) => {
    const $buttonIcon = $button.querySelector('.fa');

    $button.classList.remove('is-active');
    $buttonIcon.classList.remove('fa-caret-up', 'fa-caret-down');
  });

  $currentButton.classList.add('is-active');

  order.type = $currentButton.getAttribute('type');
  order.direction = (order.direction) ? (order.direction === 'asc') ? 'des' : 'asc' : 'asc';

  switch (`${order.type}|${order.direction}`) {
    case 'name|asc':
      array = products.sort(nameASC);
      iconClass = 'up';
      break;
    case 'name|des':
      array = products.sort(nameDES);
      iconClass = 'down';
      break;
    case 'price|asc':
      array = products.sort(priceASC);
      iconClass = 'up';
      break;
    case 'price|des':
      array = products.sort(priceDES);
      iconClass = 'down';
      break;
    default:
      array = products.sort(nameASC);
      iconClass = 'up';
  }

  if ($icon) {
    $icon.classList.add(`fa-caret-${iconClass}`);
  }

  setOrder(array);
}

function init(globalProducts) {
  products = globalProducts;

  $buttons.forEach(($tempButton) => {
    $tempButton.addEventListener('click', sortProducts);
  });
}

module.exports = {
  init: init
};
