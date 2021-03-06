// Выбираю всю часть слайдера
let price = document.getElementById('price');
// id таймера для вывода подсказки
let showTimerId = null;
// id таймера для удаления сообщения
let deleteTimerId = null;
// Для проверки, выводилась ли подсказка. Больше одного раза быть не должно
let isShow = false;
// Сама подсказка
let tooltip = null;

// Добавляю обработчик
window.addEventListener('scroll', function onScroll() {
    
    // Для удобства создаю переменную с информацией о панеле
    let sliderInfo = price.getBoundingClientRect();
    // Выносим условие в отдельную переменную
    let isVisible = sliderInfo.top < 100 && sliderInfo.top > -sliderInfo.height + 200 && true;

    // Если подсказка уже была выведена и убрана
    if (isShow) {
        // Убираем все обработчики
        this.removeEventListener('scroll', onScroll);
        buttonsZone.removeEventListener('click', deleteTooltip);
        ul.removeEventListener('click', deleteTooltip);
        return;
    }

    // Берем buttonsZone и ul из скрипта slider-arrow-buttons.js
    // Добаляем обработчики
    buttonsZone.addEventListener('click', deleteTooltip);
    ul.addEventListener('click', deleteTooltip);

    // Мы в зоне видимости, а таймер еще не запущен?
    if (isVisible && !showTimerId) {
        // Запускаем таймер
        showTimerId = setTimeout( showTooltip, 4000);
        deleteTimerId = setTimeout( deleteTooltip, 9000);
    }

    // Мы не в зоне видимости, но таймер есть?
    if (!isVisible && showTimerId) {
        // Тогда обнуляем его
        clearTimeout(showTimerId);
        clearTimeout(deleteTimerId);
        showTimerId = null;
        deleteTimerId = null;
    }

    // Подсказка есть на экране, но пользователь уже ушел с секции?
    if (!isVisible && tooltip) {
        tooltip.remove();
        isShow = true;
    }
 
    // Функция создания подсказки
    function showTooltip() {
        // Создаю специальный div под нее
        tooltip = document.createElement('div');
        text = document.createElement('p');
        text.innerHTML = 'Нажмите на изображение, чтобы добавить книгу!';
        tooltip.prepend(text);
        tooltip.className = "tooltip";

        // Ставлю ее примерно на 60 пикселей последнего элемента
        // Для этого нужно всегда выделять последний элемент
        // Он берется из скрипта slider-arrow-buttons.js, переменная elementCount
        // Также для удобства оттуда берется список ul
        let elem = ul.children[position+2];
        let elemInfo = elem.getBoundingClientRect();

        // Добавляем подсказку
        document.body.append(tooltip);

        // Вычисляем координаты для позиции подсказки
        let coordX = elemInfo.x + 60;
        let coordY = window.pageYOffset + elemInfo.y - tooltip.offsetHeight  - 15;
        
        // Применяем их
        tooltip.style.left = coordX + 'px';
        tooltip.style.top = coordY + 'px';
        tooltip.style.opacity = '1';
    }

    // Убираем подсказку, если она есть, после клика по стрелкам
    function deleteTooltip(event) {
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }
});
