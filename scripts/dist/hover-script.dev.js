"use strict";

function changeImgBlack() {
  var element = document.getElementById('li_cart_img');
  var img = element.querySelector('img');
  img.setAttribute('src', 'icons/CartBlack.png');
  console.log(img);
}

function changeImgWhite() {
  var element = document.getElementById('li_cart_img');
  var img = element.querySelector('img');
  img.setAttribute('src', 'icons/Cart.png');
  console.log(img);
}