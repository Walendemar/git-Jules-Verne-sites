let upButton = document.getElementById('upButton');

upButton.onclick = function(event) {

    // Делаем анимацию для прокрутки
    let timerId = setInterval(() => scrollTo(timerId, 0, 60), 10);
}