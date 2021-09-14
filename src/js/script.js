
// Скрипт для input-range

// Сначала проверяем, есть ли вообще такой элемент на странице
if (document.getElementById('input-range')) {
    /*
        Задаем начальное значение, чтобы оно бралось из html
        Берем значение, которое у нас указано в value и делим на значение, которое указано в аттрибуте max
        После этого получается процент, который мы прописываем в переменную --slider-position
        В CSS используем --slider-position для оформления градиента
    */
    document.getElementById('input-range').style.setProperty('--slider-position', Math.ceil(document.getElementById('input-range').value / document.getElementById('input-range').max * 100) + '%');

    /*
        Добавляем обработку события на изменение #input-range
        Делаем по сути все тоже самое, что и выше.
        Значение, которое будет у input при изменении делим на максимум
    */
    document.getElementById('input-range').addEventListener('input', function() {
        this.style.setProperty('--slider-position', Math.ceil(this.value / this.max * 100) + '%');
    });
}

// Скрипт для slider

/* ES5 способ */

// Получаем все элементы с классом slider-nav__btn
var sliderNavBtns = document.querySelectorAll('.slider-nav__btn');
var i = 0;
// Пробегаемся по ним циклом
for (i = 0; i < sliderNavBtns.length; i++) {
    // На каждый элемент "навешиваем" событие на клик. Когда по элементу будут кликать, будет вызываться эта функция
    sliderNavBtns[i].addEventListener('click', function () {
        // Получаем все слайды в слайдере
        var slides = document.querySelectorAll('.slide');
        var k;

        for (k = 0; k < slides.length; k++) {
            // Добавляем всем слайдам аттрибут hidden
            slides[k].hidden = true;
            // Убираем с кнопок активный класс
            sliderNavBtns[k].classList.remove('slider-nav__btn--is-active');
        }
        // Кнопке, по которой кликнули, добавляем активный класс
        this.classList.add('slider-nav__btn--is-active');
        // Ищем текущий слайд и убираем у него аттрибут hidden
        var currentSlide = document.querySelector(this.getAttribute('href'));
        if (currentSlide) {
            currentSlide.hidden = false;
        }
    })
}

/* ES6 способ */

/*
let sliderNavBtns = document.querySelectorAll('.slider-nav-btn');
sliderNavBtns.forEach((sliderBtn) => {
    sliderBtn.addEventListener('click', function () {
        let slides = document.querySelectorAll('.slider-slide');
        slides.forEach((slide) => {
            slide.hidden = true;
        });

        document.querySelector('.slider-nav-btn.is-active').classList.remove('is-active');
        this.classList.add('is-active');

        let currentSlide = document.querySelector('#slide-' + this.dataset.slide);
        if (currentSlide) {
            currentSlide.hidden = false;
        }
    });
});
*/

// Скрипт для header__burger

var headerMenu = document.querySelector('.js-toggleHeaderMenu');

headerMenu.addEventListener('click', function() {
    headerMenu.classList.toggle('is-active');
});
