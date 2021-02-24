"use strict";

var newbookUl = document.getElementById('newbookUl');
var buttonsPane = document.getElementById('buttonsPane'); // Начальная позиция

var panePosition = 0; // Количество элементов

var elementsCount = newbookUl.querySelectorAll('li').length; // Ставлю обработчик на клик по панеле

newbookUl.addEventListener('click', ulClick); // Ставлю обработчик на клик по стрелкам

buttonsPane.addEventListener('click', buttonClick); // Функция для обработчика newbookUl

function ulClick(event) {
  // Текущий div с картинкой
  var div = event.target.closest('.book__img'); // Если клик не по панеле с картинкой

  if (!div) {
    return;
  } // Меняем подсветку


  div.classList.toggle('selected'); // Меняем текст кнопки

  switchText(div.classList.contains('selected'), buttonsPane.querySelector('.button')); // Выделение li как выбранного

  event.target.closest('.book').classList.toggle('selected'); // Показать/убрать хедер

  if (div.classList.contains('selected')) {
    toggleHeader(newbookUl.closest('section'));
  }
} // Функция для обработчика buttonsPane


function buttonClick(event) {
  // Текущий div с картинкой
  var div = newbookUl.children[panePosition].children[0]; // Кнопка "Добавить"

  var button = buttonsPane.querySelector('.button'); // Если клик по левой кнопке

  if (event.target.classList.contains('toleft') && panePosition > 0) {
    panePosition--;
    var prevDiv = newbookUl.children[panePosition].children[0]; // Меняем текст кнопки в зависимости от наличия подсветки

    switchText(prevDiv.classList.contains('selected'), button);
  } // Если клик по правой кнопке


  if (event.target.classList.contains('toright') && panePosition < elementsCount - 1) {
    panePosition++;
    var nextDiv = newbookUl.children[panePosition].children[0];
    switchText(nextDiv.classList.contains('selected'), button);
  } // Если по кнопке добавить


  if (event.target.classList.contains('button')) {
    // Добавляю div'у с картинкой класс, меняющий подсветку и рамки
    div.classList.toggle('selected'); // Выделение li как выбранного

    div.closest('.book').classList.toggle('selected'); // Меняю текст кнопки

    switchText(div.classList.contains('selected'), button); // Показать/убрать хедер

    if (div.classList.contains('selected')) {
      toggleHeader(newbookUl.closest('section'));
    }
  } // Двигаем слайдер


  newbookUl.style.marginLeft = -panePosition * 840 + 'px';
}