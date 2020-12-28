let newbookUl = document.getElementById('newbookUl');
let buttonsPane = document.getElementById('buttonsPane');

// Начальная позиция
let panePosition = 0;

// Количество элементов
let elementsCount = newbookUl.querySelectorAll('li').length;

// Ставлю обработчик на клик по панеле
newbookUl.addEventListener('click', ulClick);

// Ставлю обработчик на клик по стрелкам
buttonsPane.addEventListener('click', buttonClick);

// Функция для обработчика newbookUl
function ulClick(event) {

    // Текущий div с картинкой
    let div = event.target.closest('.pane');

    // Если клик не по панеле с картинкой
    if  (!div) {
        return;
    }

    // Меняем подсветку
    div.classList.toggle('selected');

    // Меняем текст кнопки
    switchText(div.classList.contains('selected'), buttonsPane.querySelector('.button'));
}

// Функция для обработчика buttonsPane
function buttonClick(event) {

    // Текущий div с картинкой
    let div = newbookUl.children[panePosition].children[0];
    // Кнопка "Добавить"
    let button = buttonsPane.querySelector('.button')

    // Если клик по левой кнопке
    if (event.target.classList.contains('toleft') && panePosition > 0) {
        panePosition--;
        let prevDiv = newbookUl.children[panePosition].children[0];
        // Меняем текст кнопки в зависимости от наличия подсветки
        switchText(prevDiv.classList.contains('selected'), button);
    }

    // Если клик по правой кнопке
    if (event.target.classList.contains('toright') && panePosition < elementsCount-1) {
        panePosition++;
        let nextDiv = newbookUl.children[panePosition].children[0];
        switchText(nextDiv.classList.contains('selected'), button);
    }
    
    // Если по кнопке добавить
    if (event.target.classList.contains('button')) {
        // Добавляю div'у с картинкой класс, меняющий подсветку и рамки
        div.classList.toggle('selected');
        // Меняю текст кнопки
        switchText(div.classList.contains('selected'), button);
    }

    // Двигаем слайдер
    newbookUl.style.marginLeft = -panePosition * 840 + 'px';

}



