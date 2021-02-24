let navPanel = document.getElementById('navPanel');

// Добавляем обработчик на меню
navPanel.addEventListener("click", scrollMenu);

function scrollMenu(event) {
    // ID таймера
    let timerId;

    // Позиция секции
    let position;
    let scrollY = window.scrollY;
    
    // Для каждого элемента вызываем функцию и передаем туда параметры
    switch(event.target) {
        case navPanel.children[0]:
            // "О нас"
            position = document.getElementById('aboutUs')
                                .getBoundingClientRect()
                                .top;
            timerId = setInterval(() => scrollTo(timerId, position + scrollY, 10), 5);
            break;
        case navPanel.children[1]:
            // "Каталог"
            position = document.getElementById('price')
                               .getBoundingClientRect()
                               .top;
            timerId = setInterval(() => scrollTo(timerId, position + scrollY, 20), 10);
            break;
        case navPanel.children[2]:
            // "Новинки"
            position = document.getElementById('newbook')
                               .getBoundingClientRect()
                               .top;
            timerId = setInterval(() => scrollTo(timerId, position + scrollY, 30), 10);
            break;
        case navPanel.children[3]:
            // "Контакты"
            position = document.getElementById('contacts')
                               .getBoundingClientRect()
                               .top;
            timerId = setInterval(() => scrollTo(timerId, position + scrollY, 40), 10);
            break;
    }
}


