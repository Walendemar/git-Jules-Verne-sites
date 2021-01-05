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
    }

    if (windowPosition <= -position && direction > 0) {
        clearInterval(timerId);
    }
}

// Функция-парсер, принимающая строку и возвращающая массив слов
function parse(string) {
    let array = string.split(' ');

    return array.filter( (item) => item !== "");
}