let sliderZone = document.getElementById('sliderPrice');

//Для упрощения названия классов
let pane = "main__price__content__slider__pane";
let text = "main__price__content__slider__pane__text";

//Создаем якорь
let anchor;

sliderZone.addEventListener('mouseover', onMouseOver);
sliderZone.addEventListener('mouseout', onMouseOut);
sliderZone.addEventListener('mousemove', onMouseMove);
sliderZone.addEventListener('click', onClick)

function onMouseOver(event) {

    //Если якорь на прошлой панеле был, но по какой-то причине класс не поставился
    if (anchor && anchor != event.target.closest(`.${pane}`)) {
        anchor.lastElementChild.classList.add('hidden');
    }
    
    //Если мышь с неизвестного элемента
    if (!event.relatedTarget) return;

    // Если мышь не на панеле или не на элементе внутри
    if (!event.target.closest(`.${pane}`)) {
        return;
    }

    //Запоминаем текущую панель
    anchor = event.target.closest(`.${pane}`);

    // Удаляем класс у текстовой части, что показать ее
    anchor.lastElementChild.classList.remove('hidden');
    
}

function onMouseOut(event) {

    // Если мышь за пределами какой-либо панели или пришла с неизвестного элемента
    if (!event.target.closest(`.${pane}`) || !event.relatedTarget) {
        return;
    }

    // Если мышь передвигается между внутренними элементами панели
    if ( event.target.closest(`.${pane}`) && event.relatedTarget.closest(`.${pane}`)) {
        return;
    }
    
    //  Добавляем класс к тексту, чтобы скрыть его
    anchor.lastElementChild.classList.add('hidden');

    // Текущего элемента больше нет
    anchor = null;
    
}

function onMouseMove(event) {
    
    // Если старт был с панели
    if (event.target.closest(`.${pane}`)) {
        anchor = event.target.closest(`.${pane}`);
        anchor.lastElementChild.classList.remove('hidden');
    }
}

function onClick(event) {

    // Если клик был не по панеле
    if (!event.target.closest(`.${pane}`)) {
        return;
    }

    //Меняем обводку и цвет тени
    event.target.closest(`.${pane}`).classList.toggle('selected');

}