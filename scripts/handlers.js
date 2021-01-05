// Функция замены текста на кнопке
function switchText(status, button) {
    button.innerHTML = status ? "УБРАТЬ" : "ДОБАВИТЬ";
}

// Функция замены цвета указателя
function switchCursorColor(status, cursor) {
    
    cursor.src = status ? 'icons/cursor-orange.png' : 'icons/cursor.png';
    cursor.classList.toggle('changed');
}

// Функция для прокрутки
// position - координаты элемента
// speed - скорость перемещения
// direction - направление движения экрана
function scrollTo(timerId, position, speed, direction) {
    let windowPosition = document.body.getBoundingClientRect().top;

    window.scrollBy(0, speed * direction);

    if (windowPosition >= position && direction < 0) {
        clearInterval(timerId);
        timerId = null;
    }

    if (windowPosition <= -position && direction > 0) {
        clearInterval(timerId);
        timerId = null;
    }
}

// Функция-парсер, принимающая строку и возвращающая массив слов
function parse(string) {
    let array = string.split(' ');

    array.filter( (item) => item !== "");

    array.map( (item) => {
        if (item[length-1] == ",") item.slice(0, length-2)
    });

    return array;
}