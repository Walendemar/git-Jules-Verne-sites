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
        return true;
    }

    if (windowPosition <= -position && direction > 0) {
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