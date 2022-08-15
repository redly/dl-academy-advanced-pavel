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

/*
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
            // Добавляем всем слайдам класс visually-hidden
            slides[k].classList.add('visually-hidden');
            // Убираем с кнопок активный класс
            sliderNavBtns[k].classList.remove('slider-nav__btn--is-active');
        }
        // Кнопке, по которой кликнули, добавляем активный класс
        this.classList.add('slider-nav__btn--is-active');
        // Ищем текущий слайд и убираем у него класс visually-hidden
        var currentSlide = document.querySelector(this.getAttribute('href'));
        if (currentSlide) {
            currentSlide.classList.remove('visually-hidden');
        }
    })
}
*/

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

// Скрипт для slider со swiper js

const slider = document.querySelector('.swiper');

if (slider) {
    const swiper = new Swiper('.swiper', {
        direction: 'vertical',
        initialSlide: +localStorage.getItem('activeSlide') || 0,

        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    swiper.on('activeIndexChange', function () {
        localStorage.setItem('activeSlide', swiper.realIndex);
    });
}

// Скрипт для header__burger

var headerMenu = document.querySelector('.js-toggleHeaderMenu');

headerMenu.addEventListener('click', function() {
    headerMenu.classList.toggle('is-active');
});

// Скрипт для слайдера Category Products

const sliderBtns = document.querySelectorAll('.categories-nav__btn');

sliderBtns.forEach((sliderBtn) => {
    sliderBtn.addEventListener('click', (evt) => {
        const direction = evt.currentTarget.dataset.direction;

        // const slider = evt.currentTarget.parentNode;
        const slider = document.querySelector('.categories-list-wrapper');
        const sliderWrapper = slider.querySelector('.categories-list');

        const slides = slider.querySelectorAll('.categories-list__item');
        const activeIndex = [...slider.querySelectorAll('.categories-list__item')].indexOf(slider.querySelector('.categories-list__item.active'));

        const newIndex = (direction === 'left') ? (activeIndex - 1) : (activeIndex + 1);

        if (newIndex < 0 || newIndex >= slides.length) {
            return;
        }

        const marginRight = +getComputedStyle(slides[0]).marginRight.replace(/\D/g,'');
        const offset = newIndex * (slides[0].offsetWidth + marginRight);

        slider.querySelector('.categories-list__item.active').classList.remove('active');
        slider.querySelector('.categories-list__item:nth-child(' + (newIndex + 1) + ')').classList.add('active');

        sliderWrapper.style.transform = 'translate(-' + offset + 'px, 0)';
    });
})

// Скрипт для фильтров Toys for kids

function getParamsFromLocation() {
    let searchParams = new URLSearchParams(location.search);

    return {
        page: +searchParams.get('page') || 0,
        cost: searchParams.get('cost'),
        color: searchParams.getAll('color'),
        delivery: searchParams.get('delivery'),
        amount: searchParams.get('amount'),
    };
}

function setDataToFilter(data) {
    const form = document.forms.filter;

    if (form) {
        form.elements.cost.value = data.cost;
        form.elements.color.forEach(checkbox => {
            if (data.color.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
        form.elements.delivery.forEach(radio => {
            if (data.delivery === radio.value) {
                radio.checked = true;
            }
        });
        form.elements.amount.forEach(radio => {
            if (data.amount === radio.value) {
                radio.checked = true;
            }
        });
    }

    // TODO: Проверить заполнение custom range при перезагрузке

    // Более короткая запись сбрасывает фильтры по умолчанию
    /*
    if (form) {
        form.elements.cost.value = data.cost;
        form.elements.color.forEach(checkbox => {
            checkbox.checked = data.color.includes(checkbox.value);
        });
        form.elements.delivery.forEach(radio => {
            radio.checked = data.delivery === radio.value;
        });
        form.elements.amount.forEach(radio => {
            radio.checked = data.amount === radio.value;
        });
    }
    */
}

function setSearchParams(data) {
    let searchParams = new URLSearchParams();

    searchParams.set('cost', data.cost);
    data.color.forEach(item => {
        searchParams.append('color', item);
    });

    if (data.page) {
        searchParams.set('page', data.page);
    } else {
        searchParams.set('page', 0);
    }

    if (data.delivery) {
        searchParams.set('delivery', data.delivery);
    }

    if (data.amount) {
        searchParams.set('amount', data.amount);
    }

    history.replaceState(null, document.title, '?' + searchParams.toString());
}

(function() {
    const form = document.forms.filter;

    if (form) {
        form.addEventListener('submit', evt => {
            evt.preventDefault();

            let data = {
                page: 0,
            };

            data.cost = form.elements.cost.value;
            data.color = [...form.elements.color].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
            data.delivery = ([...form.elements.delivery].find(radio => radio.checked) || { value: null }).value;
            data.amount = ([...form.elements.amount].find(radio => radio.checked) || { value: null }).value;
            setSearchParams(data);
        });
    }

    const params = getParamsFromLocation();
    setDataToFilter(params);

    const links = document.querySelectorAll('.content-pagination__link');

    if (links.length !== 0) {
        links[params.page].classList.add('content-pagination__link--is-active');
        links.forEach((link, index) => {
            link.addEventListener('click', (evt) => {
                evt.preventDefault();
                let searchParams = new URLSearchParams(location.search);
                links[params.page].classList.remove('content-pagination__link--is-active');
                searchParams.set('page', index);
                links[index].classList.add('content-pagination__link--is-active');
                history.replaceState(null, document.title, '?' + searchParams.toString());
            });
        });
    }
})();
