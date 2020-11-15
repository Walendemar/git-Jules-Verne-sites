let buttonsZone = document.getElementById('buttonZone');
let ul = document.getElementById('ulZone');

// Добавляю обработчик
buttonsZone.addEventListener('click', onClick);

// C самого начала у нас 0 позиция элемента
let position = 0;

// Количество элементов
let elementCount = ul.querySelectorAll('li').length;

function onClick(event) {
    // Проверяем, было ли нажатие именно на кнопку-стрелку
    if (!event.target.classList.contains('arrow')) {
        return;
    }
    
    // Если клик по левой
    if (event.target.classList.contains('left')) {
        if (position < 1) {
            return;
        }
        position--;
    }

    // Если клик по правой
    if (event.target.classList.contains('right')) {
        if (position > elementCount - 4) {
            return;
        }
        position++;
    }

    // Двигаем слайдер
    ul.style.marginLeft = -position * 280 + 'px';
}
