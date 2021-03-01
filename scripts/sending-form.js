// Выбираем форму
let form = document.forms[1];
// Обёртка вокруг всего сайта
let wrapper = document.getElementById('wrapper');

// Вешаем обработчик
form.addEventListener('submit', submit);

// Функция-хендлер
function submit(event) {
    // Предотвращаем отправку формы
    event.preventDefault();

    // Запрещаем прокрутку
    document.body.style.overflow = "hidden";

    showFrame();

    // Генерация и добавление модального окна 
    function showFrame() {
        let div = document.createElement('div');
        let frame = document.createElement('div');
        let h1 = document.createElement('h1');
        let h3 = document.createElement('h3');
        let button = document.createElement('button');

        // Затемнение экрана
        div.classList.add('show-background');
        wrapper.before(div);   

        // Создание окна
        frame.classList.add('frame');

        h1.innerHTML = "Спасибо за Вашу заявку!";
        h3.innerHTML = "Мы ответим Вам в скором времени";

        frame.append(h1);
        h1.classList.add('h1');

        frame.append(h3);
        h3.classList.add('h3');

        button.innerHTML = "X";
        button.classList.add('close');

        // При клике удаляем
        button.addEventListener('click', function() {
            frame.remove();
            div.classList.remove('show-background');
            document.body.style.overflow = "";
        });

        frame.append(button);

        // Добавление окна
        div.after(frame);

        // Вычисление координат
        frame.style.left = window.pageXOffset + document.documentElement.clientWidth/2 - frame.offsetWidth/2 + 'px';
        frame.style.top = window.pageYOffset + document.documentElement.clientHeight/2 - frame.offsetHeight/2 + 'px';
    }
}


