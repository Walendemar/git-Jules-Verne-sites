"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Выбираем форму
var introForm = document.forms[0]; // Кнопка отправки

var introButton = introForm.elements[1];
introForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  // Отмена отправки по умолчанию
  event.preventDefault(); // Считывание ввода

  var text = introForm.elements[0].value; // Если ничего не введено

  if (!text) {
    return;
  }

  var words = parse(text); // Переменная ul берется из slider-arrow-buttons.js
  // Переменная newbook из slider-newbook.js
  // Поиск по слайдерам

  var result = showElement(ul) || showElement(newbookUl);

  if (!result) {
    var targetCoord = document.getElementById('finder').getBoundingClientRect().top - 26;
    var timerId;
    var scrollY = window.scrollY;
    timerId = setInterval(function () {
      return scrollTo(timerId, targetCoord + scrollY, 20);
    }, 5);
  }

  ;

  function showElement(sliderUl) {
    var current = 0;
    var timerId;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var li = _step.value;
        // Просмотр идет по имени и автору
        var string = li.children[1].children[0].textContent + ' ' + li.children[1].children[1].textContent;
        var result = words.find(function (item) {
          return parse(string).includes(item);
        });

        if (result) {
          var _targetCoord = sliderUl.closest('section').getBoundingClientRect().top + window.scrollY;

          var scrollFunc = wrapper(scrollTo);
          timerId = setInterval(function () {
            return scrollFunc(timerId, _targetCoord - 26, 20);
          }, 5);
          return {
            v: true
          };
        }

        current++;
      };

      for (var _iterator = sliderUl.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ret = _loop();

        if (_typeof(_ret) === "object") return _ret.v;
      }
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

    function scrollSlider() {
      var cursor = document.getElementById('sliderCursor');
      var button = sliderUl.closest('section').querySelector('.button');
      var condition = sliderUl.children[current].classList.contains('selected');

      switch (sliderUl) {
        case ul:
          position = current - 1;
          ul.style.marginLeft = -position * 280 + 'px';
          switchCursorColor(condition);
          switchText(condition, button);
          break;

        case newbookUl:
          panePosition = current;
          newbookUl.style.marginLeft = -panePosition * 840 + 'px';
          switchCursorColor(condition);
          switchText(condition, button);
          break;
      }
    } // Функция-обёртка


    function wrapper(func) {
      return function () {
        var result = func.apply(void 0, arguments); // Когда экран достиг нужной точки, запускается прокрутка самого слайдера

        if (result) {
          setTimeout(function () {
            return scrollSlider();
          }, 800);
        }
      };
    }

    return false;
  }
}