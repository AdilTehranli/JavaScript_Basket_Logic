let addButtons = document.querySelectorAll(".cart_button");
let cartIcon = document.querySelector(".cart_icon");

document.addEventListener("DOMContentLoaded", function () {
  let basketstr = localStorage.getItem("basket");
  let basket = JSON.parse(basketstr);

  if (!basket || !basket.length) {
    localStorage.setItem("basket", JSON.stringify([]));
  } else {
    ShowProductCount(basket);
  }
});

addButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      localStorage.setItem("basket", JSON.stringify([]));
      basket = JSON.parse(localStorage.getItem("basket"));
    }
    let product = GetProductsData(this);
    console.log(product);
    let sameid = basket.find((basketproduct) => {
      return basketproduct.id == product.id;
    });
    if (!sameid) {
      basket.push(product);
    } else {
      sameid.count++;
    }
    ShowProductCount(basket);
    let basketstr = JSON.stringify(basket);
    localStorage.setItem("basket", basketstr);
  });
});

cartIcon.addEventListener("click", function () {
  let cartItems = JSON.parse(localStorage.getItem("basket"));
  if (cartItems) {
    console.log(cartItems);
  }
});

function GetProductsData(btn) {
  let parent = btn.parentElement.parentElement;
  console.log(parent);
  let productName = parent.querySelector(".card-title").innerText;
  let productPrice = parent.querySelector(".card-text").innerText;
  let src = parent.querySelector("img").src;
  let id = parent.getAttribute("data-id");
  result = { productName, src, id, productPrice, count: 1 };
  return result;
}

function ShowProductCount(basket) {
  let basketCount = document.querySelectorAll(".total_count");
  basketCount.forEach((btn) => {
    btn.innerText = basket.reduce((total, product) => {
      return Math.trunc((total += product.count));
    }, 0);
  });
}
