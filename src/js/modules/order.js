'use strict';

let products;
let order = {
  type: null,
  direction: null
};

const $button = document.querySelector('.header-sort');
const $buttons = document.querySelectorAll('.header-sort-icon');
const $box = document.querySelector('.header-sort-box');

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

function openSort() {
  $box.classList.toggle('is-open');
}

function sortProducts(event) {
  const $currentButton = event.target;
  let array;

  order.type = $currentButton.getAttribute('type');
  order.direction = (order.direction) ? (order.direction === 'asc') ? 'des' : 'asc' : 'asc';

  console.log(order.direction);

  switch (`${order.type}|${order.direction}`) {
    case 'name|asc':
      array = products.sort(nameASC);
      break;
    case 'name|des':
      array = products.sort(nameDES);
      break;
    case 'price|asc':
      array = products.sort(priceASC);
      break;
    case 'price|des':
      array = products.sort(priceDES);
      break;
    default:
      array = products.sort(nameASC);
  }

  setOrder(array);
}

function init(globalProducts) {
  products = globalProducts;

  $button.addEventListener('click', openSort);

  $buttons.forEach(($tempButton) => {
    $tempButton.addEventListener('click', sortProducts);
  });

  // setOrder(products.sort(nameASC));
  // console.log(products.sort(nameASC));
  // console.log(products.sort(nameDES));
  // console.log(products.sort(priceASC));
  // console.log(products.sort(priceDES));
}

module.exports = {
  init: init
};
