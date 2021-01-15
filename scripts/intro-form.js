// Выбираем форму
let introForm = document.forms[0];

// Кнопка отправки
let introButton = introForm.elements[1];

introForm.addEventListener("submit", onSubmit);

function onSubmit(event) {

    // Отмена отправки по умолчанию
    event.preventDefault();
    
    // Считывание ввода
    let text = introForm.elements[0].value;

    // Если ничего не введено
    if (!text) {
        return;
    }

    let words = parse(text);

    // Переменная ul берется из slider-arrow-buttons.js
    // Переменная newbook из slider-newbook.js
    
    // Поиск по слайдерам
    let result = showElement(ul) || showElement(newbookUl);

    if (!result) {
        let targetCoord = document.getElementById('finder')
                                  .getBoundingClientRect()
                                  .top - 26;
        let timerId;
        let scrollY = window.scrollY;
        timerId = setInterval(() => scrollTo(timerId, targetCoord + scrollY, 20, 1), 5);
    };


    function showElement(sliderUl) {
        let current = 0;
        let timerId;

        for (let li of sliderUl.children) {
            // Просмотр идет по имени и автору
            
            let string = li.children[1].children[0].textContent + ' ' + li.children[1].children[1].textContent;
            let result = words.find( (item) => parse(string).includes(item));
            
            if (result) {
                let targetCoord = sliderUl.closest('section').getBoundingClientRect()
                                       .top + window.scrollY;

                let scrollFunc = wrapper(scrollTo);

                timerId = setInterval(() => scrollFunc(timerId, targetCoord - 26, 20, 1), 5);
                
                return true;
            }

            current++;
        }

        function scrollSlider() {
            let cursor = document.getElementById('sliderCursor');
            let button = sliderUl.closest('section').querySelector('.button');
            let condition;

            switch(sliderUl) {
                case ul:
                    position = current - 1;
                    ul.style.marginLeft = - (position) * 280 + 'px';
                    condition = sliderUl.children[current].classList.contains('selected');
                    switchCursorColor(condition, cursor); 
                    switchText(condition, button);
                    break;
                case newbookUl:
                    panePosition = current;
                    newbookUl.style.marginLeft = - (panePosition) * 840 + 'px';
                    condition = sliderUl.children[panePosition].classList.contains('selected');
                    switchCursorColor(condition, cursor); 
                    switchText(condition, button);
                    break;
            }
        }

        // Функция-обёртка
        function wrapper(func) {

            return function(...args) {
                let result = func(...args);
                
                // Когда экран достиг нужной точки, запускается прокрутка самого слайдера
                if (result) {
                    setTimeout(() => scrollSlider(), 800);
                }
            }
        }

        return false;
    }

}