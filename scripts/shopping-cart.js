let liCartImg = document.getElementById('liCartImg');
let img = document.getElementById('iconCart');

// Изменение картинки при наведении
liCartImg.addEventListener('mouseover', mouseOver);
liCartImg.addEventListener('mouseleave', mouseLeave);

function mouseOver() {
    img.setAttribute('src', 'icons/CartBlack.png');
}

function mouseLeave() {
    img.setAttribute('src', 'icons/Cart.png');
}

// Отображение корзины при клике по пункту меню
liCartImg.addEventListener('click', showShoppingCart);

function showShoppingCart(event) {

    // Запрет прокрутки
    document.body.style.overflow = "hidden";

    // Создание div для затемнения экрана
    let div = document.createElement('div');
    let wrapper = document.getElementById('wrapper');

    // Затемнение экрана
    div.classList.add('show_background');
    wrapper.before(div); 

    // Создание модального окна
    let frame = document.createElement('div');
    // Добавление ему класса
    frame.classList.add('shop');

    // Четыре div'а: для заголовка, контента, кнопки отправки и закрытия модального окна
    let heading = document.createElement('div');
    let contentDiv = document.createElement('div');
    let buttonDiv = document.createElement('div');
    let closeButton = document.createElement('button');

    // Добавление заголовка
    let h1 = document.createElement('h1');
    h1.innerHTML = "Корзина";
    h1.classList.add('h1');
    heading.append(h1);
    heading.classList.add('shop__heading');

    // Div и содержащийся внутри ul
    contentListDiv = document.createElement('div');
    contentListDiv.classList.add('shop__content__list');
    let ul = document.createElement('ul');
    contentListDiv.append(ul);

    // Div-блок с информацией о покупке
    contentPriceDiv = document.createElement('div');
    contentPriceDiv.classList.add('shop__content__price');

    // Добавление в div с контентом
    contentDiv.classList.add('shop__content');
    contentDiv.append(contentListDiv);
    contentDiv.append(contentPriceDiv);

    // Проход по всем li на слайдерах в поиске тех, которые отмечены классом selected
    let selectedLi = document.querySelectorAll('li.selected');

    // Добавление кнопки в div
    let buyButton = document.createElement('button');
    buyButton.innerHTML = "КУПИТЬ";
    buyButton.classList.add('button');
    buttonDiv.classList.add('shop__button');
    buttonDiv.append(buyButton);
    
    // Итоговая цена
    let sum = 0;
    // Комиссия
    let commission = 0;
    // Коллекция для хранения информации о связи выбранных товаров в корзине с товарами на сайте
    let bindingElements = new Map();

    // Добавление выделенных элементов в корзину
    for (let element of selectedLi) {
        let li = document.createElement('li');
        let imgDiv = document.createElement('div');
        let textDiv = document.createElement('div');
        let deletePanelButton = document.createElement('button');

        let img = document.createElement('img');
        img.src = element.querySelector('img').src;

        imgDiv.classList.add('shop__content__list__element__img_container');
        imgDiv.append(img);

        let name = element.querySelector('.book_name').textContent;
        let author = element.querySelector('.book_author').textContent;
        let value = element.querySelector('.book_price').textContent;

        textDiv.classList.add('shop__content__list__element__text_container');
        textDiv.innerHTML = `<p>${name}</p>
                             <p>${author}</p>
                             <p>Цена: <span class="cost">${value}</span></p>`;

        deletePanelButton.innerHTML = 'X';
        deletePanelButton.classList.add('close_button');

        li.classList.add('shop__content__list__element');
        li.append(imgDiv);
        li.append(textDiv);
        li.append(deletePanelButton);

        ul.append(li);

        // Добавляем в коллекцию элемент
        bindingElements.set(li, element);

        // Суммирование цены текущего товара с общей суммой
        sum += parseInt(value);
    }

    
    // Обработчик для закрытия конкретной панели с товаром
    ul.addEventListener('click', deletePanel); 

    // Div-блок с итоговой ценой, комиссией, платежной системой
    let form = document.createElement('form');
    form.name = 'totalCost';
    form.innerHTML = `<p>Итого: <span id="total">${sum}</span> руб.</p>
                      <p>Комиссия: <span id="payCommission">${commission}</span> руб.</p>`;
    let select = document.createElement('select');

    // Платежные системы и их комиссия
    let options = {
        'PayPal': 2,
        'Яндекс.Деньги': 1,
        'MasterCard': 2.5,
        'МИР': 3,
    }

    for (let option of Object.keys(options)) {
        let elem = document.createElement('option');
        elem.innerHTML = `${option}`;
        select.append(elem);
    }

    let label = document.createElement('label');
    label.textContent = "Выберите платёжную систему:";
    label.append(select);
    form.append(label);    

    // Обработчик для перерасчёта коммисии
    select.addEventListener('change', onChange);

    contentPriceDiv.append(form);

    frame.append(heading);
    frame.append(contentDiv);
    frame.append(buttonDiv);

    div.after(frame);

    let total = document.getElementById('total');
    let payCommission = document.getElementById('payCommission');

    insertCommission();

    // Добавление кнопки закрытия меню
    closeButton.classList.add('close_frame');
    closeButton.innerHTML = "X";
    frame.append(closeButton);

    // Позиционирование кнопки закрытия корзины
    closeButton.style.left = frame.offsetWidth - closeButton.offsetWidth * 0.5 + 'px';
    closeButton.style.top =  -closeButton.offsetHeight * 0.3 + 'px';

    // Добавление обработчика на кнопку закрытия
    closeButton.addEventListener('click', function() {
        frame.remove();
        document.body.style.overflow = "";
        div.classList.remove('show_frame');
    });

    // Позиционирование фрейма
    frame.style.left = window.pageXOffset + document.documentElement.clientWidth/2 - frame.offsetWidth/2 + 'px';
    frame.style.top = window.pageYOffset + document.documentElement.clientHeight/2 - frame.offsetHeight/2 + 'px';

    function deletePanel(event) {

        if (event.target.tagName !== "BUTTON") {
            return;
        }
        
        // Панель, которую нужно закрыть
        let pane = event.target.closest('.shop__content__list__element');

        // Вычитание стоимости товара из общей суммы
        let value = pane.querySelector('span')
                        .textContent;
        sum -= parseInt(value);

        // Новая сумма вставляется в форму
        total.textContent = `${sum}`;

        // Вычисление комиссии
        insertCommission();

        // Отмена выделения удаленного элемента
        toggleSelected(bindingElements.get(pane));
        bindingElements.delete(pane);

        // Удаление панели
        pane.remove();
    }

    function onChange(event) {
        insertCommission();
    }

    // Вычисление комисcии
    function insertCommission() {
        commission = Math.ceil(sum * options[select.value] / 100);
        payCommission.textContent = `${commission}`;
    }

    // Поиск и снятие выделения с удаленных из корзины элементов
    function toggleSelected(element) {

        element.classList.remove('selected');

        // Если элемент из первого слайдера
        let price = element.closest('.main__price__content');

        if (price) {
            let cursor = document.getElementById('sliderCursor');
            let ul = price.querySelector('ul');

            // Проверка, является ли этот элемент текущим
            let condition = (element == ul.children[position+1]);

            if (condition) {
                switchCursorColor(false, cursor);
                switchText(false, price.querySelector('.button'));
            }

            return;
        }

        // Если элемент из второго слайдера
        let newbook = element.closest('.main__newbook');
        
        if (newbook) {
            let ul = newbook.querySelector('ul');

            // Удаление подсветки у изображения
            element.querySelector('.pane').classList.remove('selected');

            // Проверка, является ли этот элемент текущим
            let condition = (element == ul.children[panePosition]);

            if (condition) {
                switchText(false, newbook.querySelector('.button'));
            }

            return;
        }
    }
}
