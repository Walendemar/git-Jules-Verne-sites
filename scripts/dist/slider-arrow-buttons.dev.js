"use strict";

var buttonsZone = document.getElementById('buttonZone');
var ul = document.getElementById('ulZone'); // Добавляю обработчик

buttonsZone.addEventListener('click', onClick); // C самого начала у нас 0 позиция элемента

var position = 0; // Количество элементов

var elementCount = ul.querySelectorAll('li').length;

function onClick(event) {
  // Проверяем, было ли нажатие на кнопку-стрелку или "добавить"
  if (!event.target.closest('button')) {
    return;
  } // Кнопка "Добавить"


  var button = buttonsZone.querySelector('.button'); // Если клик по "Добавить"

  if (event.target.classList.contains('button')) {
    // Меняем текст
    switchText(!ul.children[position + 1].classList.contains('selected'), button); // Меняем цвет курсора

    switchCursorColor(!ul.children[position + 1].classList.contains('selected')); // Меняем класс

    ul.children[position + 1].classList.toggle('selected'); // // Показать/убрать хедер

    if (ul.children[position + 1].classList.contains('selected')) {
      toggleHeader(ul.closest('section'));
    }
  } // Если клик по левой стрелке


  if (event.target.classList.contains('left')) {
    if (position < 0) {
      return;
    }

    if (position >= 0) {
      // Меняем текст кнопки
      switchText(ul.children[position].classList.contains('selected'), button); // Меняем цвет курсора

      switchCursorColor(ul.children[position].classList.contains('selected'));
    }

    position--;
  } // Если клик по правой стрелке


  if (event.target.classList.contains('right')) {
    if (position > elementCount - 3) {
      return;
    }

    if (position <= elementCount - 2 && position >= -2) {
      // Меняем текст кнопки
      switchText(ul.children[position + 2].classList.contains('selected'), button); // Меняем цвет курсора

      switchCursorColor(ul.children[position + 2].classList.contains('selected'));
    }

    position++;
  } // Двигаем слайдер


  ul.style.marginLeft = -position * 280 + 'px';
}