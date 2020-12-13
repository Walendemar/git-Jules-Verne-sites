let newbookUl = document.getElementById('newbookUl');
let buttonsPane = document.getElementById('buttonsPane');

// Начальная позиция
let panePosition = 0;

// Количество элементов
let elementsCount = newbookUl.querySelectorAll('li').length;

// Ставлю обработчик на клик по стрелкам
buttonsPane.addEventListener('click', buttonClick);

// Функция для обработчика
function buttonClick(event) {

    // Текущий div с картинкой
    let div = newbookUl.children[panePosition].children[0];
    
    // Если клик по левой кнопке
    if (event.target.classList.contains('toleft') && panePosition > 0) {
        panePosition--;
        let prevDiv = newbookUl.children[panePosition].children[0];
        // Меняем текст кнопки в зависимости от наличия подсветки
        switchText(prevDiv.classList.contains('selected') ? true : false);
    }

    // Если клик по правой кнопке
    if (event.target.classList.contains('toright') && panePosition < elementsCount-1) {
        panePosition++;
        let nextDiv = newbookUl.children[panePosition].children[0];
        switchText(nextDiv.classList.contains('selected') ? true : false);
    }
    
    // Если по кнопке добавить
    if (event.target.classList.contains('button')) {
        // Добавляю div'у с картинкой класс, меняющий подсветку и рамки
        
        div.classList.toggle('selected');
        // Меняю текст кнопки
        switchText(div.classList.contains('selected') ? true : false);
    }

    function switchText(status) {
        buttonsPane.querySelector('.button').innerHTML = status ? "УБРАТЬ" : "ДОБАВИТЬ";
    }

    // Двигаем слайдер
    newbookUl.style.marginLeft = -panePosition * 840 + 'px';
}

