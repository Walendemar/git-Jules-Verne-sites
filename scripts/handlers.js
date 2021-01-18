// Функция замены текста на кнопке
function switchText(status, button) {
    button.innerHTML = status ? "УБРАТЬ" : "ДОБАВИТЬ";
}

// Функция замены цвета указателя
function switchCursorColor(status) {
    let sliderCursor = document.getElementById('sliderCursor');

    sliderCursor.src = status ? 'icons/cursor-orange.png' : 'icons/cursor.png';
    sliderCursor.classList.toggle('changed');
}

// Функция для прокрутки
// position - координаты элемента
// speed - скорость перемещения
// direction - направление движения экрана
function scrollTo(timerId, position, speed) {
    let windowPosition = document.body.getBoundingClientRect();

     // Если экран на месте
     if (Math.abs(windowPosition.top) === Math.abs(position)) {
        clearInterval(timerId);
        return true;
    }

    let direction = Math.abs(windowPosition.top) > Math.abs(position) ? -1 : 1;

    // При подходе к позиции необходимо снизить скорость
    let minDistance = Math.abs(Math.abs(windowPosition.top) - Math.abs(position));

    switch(true) {
        case (minDistance <= 11):
            speed = 1;
            break;
        case (minDistance <= 60):
            speed = 10;
            break;  
    }

    window.scrollBy(0, speed * direction);

    // Если экран достиг конца страницы
    if (windowPosition.bottom <= document.documentElement.clientHeight + 1 && direction > 0) {
        scrollBy(0, -1);
        clearInterval(timerId);
        return true;
    }
}

// Функция-парсер, принимающая строку, обрабатывающая ее и возвращающая массив слов
function parse(string) {

    string = string.toLowerCase();

    let array = string.split(' ');

    array.filter( (item) => item !== "");

    return array.map( (item) => 
        item[item.length-1] == "," || item[item.length-1] == "!" ? item.substr(0, item.length-1) : item
    );
}

// Функция для показа/скрытия хедера
function toggleHeader(zoneElement) {

    let header = document.getElementById('header');

    // Виден ли хедер на своем стандартном месте
    if (-document.body.getBoundingClientRect().top <= header.offsetHeight - 45) {
        return;
    }

    // Проверка, был ли хедер уже показан
    if (header.classList.contains('show_header')) {
        return;
    }

    // Необходима "заглушка" на место хедера
    let bung = document.createElement('div');
    bung.style.height = header.offsetHeight + 'px';
    bung.classList.add('bung');

    // Обработчик для проверки
    let timerId;
    
    window.addEventListener('scroll', onScroll);

    timerId = setTimeout(() => hideHeader(), 9000);

    showHeader();

    function onScroll() {
        let zoneInfo = zoneElement.getBoundingClientRect();
        // Проверка на видимость секции
        let isVisible = zoneInfo.top < 300 && zoneInfo.top > -zoneInfo.height + 200 && true;

        if (!isVisible) {
            clearInterval(timerId);
            hideHeader();
            window.removeEventListener('scroll', onScroll);
        }
    }

    // Функция, показывающая хедер
    function showHeader() {
        header.before(bung);
        header.classList.add('show_header');
        setTimeout(() => header.style.marginTop = 80 + 'px', 100);
    }

    // Функция, скрывающая хедер
    function hideHeader() {
        header.style.marginTop = 0;
        setTimeout(() => header.classList.remove('show_header'), 400);
        setTimeout(() => bung.remove(), 400);
    }

}