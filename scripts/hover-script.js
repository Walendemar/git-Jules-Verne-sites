let liCartImg = document.getElementById('liCartImg');
let img = document.getElementById('iconCart');

liCartImg.addEventListener('mouseover', mouseOver);
liCartImg.addEventListener('mouseleave', mouseLeave);

function mouseOver() {
    img.setAttribute('src', 'icons/CartBlack.png');
}

function mouseLeave() {
    img.setAttribute('src', 'icons/Cart.png');
}