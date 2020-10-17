function changeImgBlack() {
    let element = document.getElementById('li_cart_img');
    let img = element.querySelector('img');
    img.setAttribute('src', 'icons/CartBlack.png')
    console.log(img);
}

function changeImgWhite() {
    let element = document.getElementById('li_cart_img');
    let img = element.querySelector('img');
    img.setAttribute('src', 'icons/Cart.png')
    console.log(img);
}