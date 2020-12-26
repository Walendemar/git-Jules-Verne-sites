let liCartImg = document.getElementById('liCartImg');
let img = document.getElementById('iconCart');

liCartImg.onmouseover = function() {
    img.setAttribute('src', 'icons/CartBlack.png');
}

liCartImg.onmouseleave = function() {
    img.setAttribute('src', 'icons/Cart.png')
}