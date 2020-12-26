let upButton = document.getElementById('upButton');

upButton.onclick = function(event) {

    // Функция для прокрутки
    function scrollHandler(timerId) {
        let coordY = document.body.getBoundingClientRect().top;

        window.scrollBy(0, -50);

        if (coordY >= 0) {
            clearInterval(timerId);
        }
    }

    // Делаем анимацию для прокрутки
    let timerId = setInterval(() => scrollHandler(timerId), 5);
}