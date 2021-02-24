"use strict";

var liCartImg = document.getElementById('liCartImg');
var img = document.getElementById('iconCart'); // Изменение картинки при наведении

liCartImg.addEventListener('mouseover', mouseOver);
liCartImg.addEventListener('mouseleave', mouseLeave);

function mouseOver() {
  img.setAttribute('src', 'icons/CartBlack.png');
}

function mouseLeave() {
  img.setAttribute('src', 'icons/Cart.png');
} // Отображение корзины при клике по пункту меню


liCartImg.addEventListener('click', showShoppingCart);

function showShoppingCart(event) {
  // Запрет прокрутки
  document.body.style.overflow = "hidden"; // Создание div для затемнения экрана

  var div = document.createElement('div');
  var wrapper = document.getElementById('wrapper'); // Затемнение экрана

  div.classList.add('show_background');
  wrapper.before(div); // Создание модального окна

  var frame = document.createElement('div'); // Добавление ему класса

  frame.classList.add('shop'); // Четыре div'а: для заголовка, контента, кнопки отправки и закрытия модального окна

  var heading = document.createElement('div');
  var contentDiv = document.createElement('div');
  var buttonDiv = document.createElement('div');
  var closeButton = document.createElement('button'); // Добавление заголовка

  var h1 = document.createElement('h1');
  h1.innerHTML = "Корзина";
  h1.classList.add('h1');
  heading.append(h1);
  heading.classList.add('block-heading'); // Div и содержащийся внутри ul

  contentListDiv = document.createElement('div');
  contentListDiv.classList.add('block-content__list');
  var ul = document.createElement('ul');
  contentListDiv.append(ul); // Div-блок с информацией о покупке

  contentPriceDiv = document.createElement('div');
  contentPriceDiv.classList.add('block-content__price'); // Добавление в div с контентом

  contentDiv.classList.add('block-content');
  contentDiv.append(contentListDiv);
  contentDiv.append(contentPriceDiv); // Проход по всем li на слайдерах в поиске тех, которые отмечены классом selected

  var selectedLi = document.querySelectorAll('li.selected'); // Добавление кнопки в div

  var buyButton = document.createElement('button');
  buyButton.innerHTML = "КУПИТЬ";
  buyButton.classList.add('button');
  buttonDiv.classList.add('container-button');
  buttonDiv.append(buyButton); // Итоговая цена

  var sum = 0; // Комиссия

  var commission = 0; // Коллекция для хранения информации о связи выбранных товаров в корзине с товарами на сайте

  var bindingElements = new Map(); // Добавление выделенных элементов в корзину

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = selectedLi[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var element = _step.value;
      var li = document.createElement('li');
      var imgDiv = document.createElement('div');
      var textDiv = document.createElement('div');
      var deletePanelButton = document.createElement('button');

      var _img = document.createElement('img');

      _img.src = element.querySelector('img').src;
      imgDiv.classList.add('block-content__container-image');
      imgDiv.append(_img);
      var name = element.querySelector('.book__name').textContent;
      var author = element.querySelector('.book__author').textContent;
      var value = element.querySelector('.book__price').textContent;
      textDiv.classList.add('block-content__container-text');
      textDiv.innerHTML = "<p>".concat(name, "</p>\n                             <p>").concat(author, "</p>\n                             <p>\u0426\u0435\u043D\u0430: <span class=\"cost\">").concat(value, "</span></p>");
      deletePanelButton.innerHTML = 'X';
      deletePanelButton.classList.add('close-button');
      li.classList.add('block-content__element');
      li.append(imgDiv);
      li.append(textDiv);
      li.append(deletePanelButton);
      ul.append(li); // Добавляем в коллекцию элемент

      bindingElements.set(li, element); // Суммирование цены текущего товара с общей суммой

      sum += parseInt(value);
    } // Обработчик для закрытия конкретной панели с товаром

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ul.addEventListener('click', deletePanel); // Div-блок с итоговой ценой, комиссией, платежной системой

  var form = document.createElement('form');
  form.name = 'totalCost';
  form.innerHTML = "<p>\u0418\u0442\u043E\u0433\u043E: <span id=\"total\">".concat(sum, "</span> \u0440\u0443\u0431.</p>\n                      <p>\u041A\u043E\u043C\u0438\u0441\u0441\u0438\u044F: <span id=\"payCommission\">").concat(commission, "</span> \u0440\u0443\u0431.</p>");
  var select = document.createElement('select'); // Платежные системы и их комиссия

  var options = {
    'PayPal': 2,
    'Яндекс.Деньги': 1,
    'MasterCard': 2.5,
    'МИР': 3
  };

  for (var _i = 0, _Object$keys = Object.keys(options); _i < _Object$keys.length; _i++) {
    var option = _Object$keys[_i];
    var elem = document.createElement('option');
    elem.innerHTML = "".concat(option);
    select.append(elem);
  }

  var label = document.createElement('label');
  label.textContent = "Выберите платёжную систему:";
  label.append(select);
  form.append(label); // Обработчик для перерасчёта коммисии

  select.addEventListener('change', onChange);
  contentPriceDiv.append(form);
  frame.append(heading);
  frame.append(contentDiv);
  frame.append(buttonDiv);
  div.after(frame);
  var total = document.getElementById('total');
  var payCommission = document.getElementById('payCommission');
  insertCommission(); // Добавление кнопки закрытия меню

  closeButton.classList.add('close-frame');
  closeButton.innerHTML = "X";
  frame.append(closeButton); // Позиционирование кнопки закрытия корзины

  closeButton.style.left = frame.offsetWidth - closeButton.offsetWidth * 0.5 + 'px';
  closeButton.style.top = -closeButton.offsetHeight * 0.3 + 'px'; // Добавление обработчика на кнопку закрытия

  closeButton.addEventListener('click', function () {
    frame.remove();
    document.body.style.overflow = "";
    div.classList.remove('show-background');
  }); // Позиционирование фрейма

  frame.style.left = window.pageXOffset + document.documentElement.clientWidth / 2 - frame.offsetWidth / 2 + 'px';
  frame.style.top = window.pageYOffset + document.documentElement.clientHeight / 2 - frame.offsetHeight / 2 + 'px';

  function deletePanel(event) {
    if (event.target.tagName !== "BUTTON") {
      return;
    } // Панель, которую нужно закрыть


    var pane = event.target.closest('.block-content__element'); // Вычитание стоимости товара из общей суммы

    var value = pane.querySelector('span').textContent;
    sum -= parseInt(value); // Новая сумма вставляется в форму

    total.textContent = "".concat(sum); // Вычисление комиссии

    insertCommission(); // Отмена выделения удаленного элемента

    toggleSelected(bindingElements.get(pane));
    bindingElements["delete"](pane); // Удаление панели

    pane.remove();
  }

  function onChange(event) {
    insertCommission();
  } // Вычисление комисcии


  function insertCommission() {
    commission = Math.ceil(sum * options[select.value] / 100);
    payCommission.textContent = "".concat(commission);
  } // Поиск и снятие выделения с удаленных из корзины элементов


  function toggleSelected(element) {
    element.classList.remove('selected'); // Если элемент из первого слайдера

    var price = element.closest('.main__price__content');

    if (price) {
      var cursor = document.getElementById('sliderCursor');

      var _ul = price.querySelector('ul'); // Проверка, является ли этот элемент текущим


      var condition = element == _ul.children[position + 1];

      if (condition) {
        switchCursorColor(false);
        switchText(false, price.querySelector('.button'));
      }

      return;
    } // Если элемент из второго слайдера


    var newbook = element.closest('.main__newbook');

    if (newbook) {
      var _ul2 = newbook.querySelector('ul'); // Удаление подсветки у изображения


      element.querySelector('.pane').classList.remove('selected'); // Проверка, является ли этот элемент текущим

      var _condition = element == _ul2.children[panePosition];

      if (_condition) {
        switchText(false, newbook.querySelector('.button'));
      }

      return;
    }
  }
}