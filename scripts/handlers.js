// Функция замены текста на кнопке
function switchText(status, button) {
    button.innerHTML = status ? "УБРАТЬ" : "ДОБАВИТЬ";
}

// Функция замены цвета указателя
function switchCursorColor(status, cursor) {
    
    cursor.src = status ?  'icons/cursor-orange.png' : 'icons/cursor.png';
    cursor.classList.toggle('changed');
}