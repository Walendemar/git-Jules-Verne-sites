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
    let windowPosition = document.body.getBoundingClientRect();
    let documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );

    console.log(windowPosition.bottom);
    // console.log('window: ', document.documentElement.clientHeight);
    // console.log('document: ', document.body.offsetHeight);
    // console.log('different: ', documentHeight);

    window.scrollBy(0, speed * direction);

    if (windowPosition.top >= position && direction < 0) {
        clearInterval(timerId);
        return true;
    }

    if (windowPosition.top <= -position && direction > 0) {
        clearInterval(timerId);
        return true;
    }

    // Если экран достиг конца страницы
    if (windowPosition.bottom <= document.documentElement.clientHeight + 10 && position !== 0) {
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