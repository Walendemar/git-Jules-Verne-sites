let navPanel = document.getElementById('navPanel');

// Все переменные

// Добавляем обработчик на меню
navPanel.addEventListener("click", scrollMenu);

function scrollMenu(event) {

    // ID таймера
    let timerId;

    // Позиция секции
    let position;
    // Для каждого элемента вызываем функцию и передаем туда параметры
    switch(event.target) {
        case navPanel.children[0]:
            // "О нас"
            position = document.getElementById('aboutUs')
                                .getBoundingClientRect()
                                .top;
            console.log(position);
            timerId = setInterval(() => scrollTo(timerId, position-15, 10, 1), 5);
            break;
        case navPanel.children[1]:
            // ""
            position = document.getElementById('price')
                               .getBoundingClientRect()
                               .top;
            console.log(position);
            timerId = setInterval(() => scrollTo(timerId, position-27, 20, 1), 10);
            break;
        case navPanel.children[2]:
            // ""
            position = document.getElementById('newbook')
                               .getBoundingClientRect()
                               .top;
            console.log(position);
            timerId = setInterval(() => scrollTo(timerId, position-30, 30, 1), 10);
            break;
        case navPanel.children[3]:
            // ""
            position = document.getElementById('contacts')
                               .getBoundingClientRect()
                               .top;
            console.log(position);
            timerId = setInterval(() => scrollTo(timerId, position-70, 40, 1), 10);
            break;
    }
}


