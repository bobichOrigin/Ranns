function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});;
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();;
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }

    // Получение слойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
        return item.dataset.spollers.split(",")[0];
    });

    // Инициализация слойлеров с медиа запросами
    if (spollersMedia.length > 0) {
        const breakpointsArray = [];
        spollersMedia.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        // Получаем уникальные брейкпоинты
        let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });

        // Работаем с каждым брейкпоинтом
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            // Объекты с нужными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });
            // Событие
            matchMedia.addListener(function () {
                initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}

let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};
isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function ibg() {

    let ibg = document.querySelectorAll("._ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

// var keyCode;
// function mask(event) {
//     console.log("1");
//     event.keyCode && (keyCode = event.keyCode);
//     var pos = this.selectionStart;
//     if (pos < 3) event.preventDefault();
//     var matrix = "+7 (___) ___ ____",
//         i = 0,
//         def = matrix.replace(/\D/g, ""),
//         val = this.value.replace(/\D/g, ""),
//         new_value = matrix.replace(/[_\d]/g, function (a) {
//             return i < val.length ? val.charAt(i++) || def.charAt(i) : a
//         });
//     i = new_value.indexOf("_");
//     if (i != -1) {
//         i < 5 && (i = 3);
//         new_value = new_value.slice(0, i)
//     }
//     var reg = matrix.substr(0, this.value.length).replace(/_+/g,
//         function (a) {
//             return "\\d{1," + a.length + "}"
//         }).replace(/[+()]/g, "\\$&");
//     reg = new RegExp("^" + reg + "$");
//     if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
//     if (event.type == "blur" && this.value.length < 5) this.value = ""
// }

// let massiveOfTel = document.querySelectorAll('._tel');

// massiveOfTel.forEach(item => {
//     item.addEventListener("input", mask, false);
//     item.addEventListener("focus", mask, false);
//     item.addEventListener("blur", mask, false);
//     item.addEventListener("keydown", mask, false)
// })

// [].forEach.call(document.querySelectorAll('._tel'), function (input) {
//     console.log("object");


//     input.addEventListener("input", mask, false);
//     input.addEventListener("focus", mask, false);
//     input.addEventListener("blur", mask, false);
//     input.addEventListener("keydown", mask, false)

// });;
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');

            if (slider.classList.contains('_swiper_scroll')) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add('swiper-scrollbar');
                slider.appendChild(sliderScroll);
            }
        }
        if (slider.classList.contains('_gallery')) {
            //slider.data('lightGallery').destroy(true);
        }
    }
    sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
        const sliderScrollItem = sliderScrollItems[index];
        const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
        const sliderScroll = new Swiper(sliderScrollItem, {
            observer: true,
            observeParents: true,
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: sliderScrollBar,
                draggable: true,
                snapOnRelease: false
            },
            mousewheel: {
                releaseOnEdges: true,
            },
        });
        sliderScroll.scrollbar.updateSize();
    }
}


function sliders_bild_callback(params) { }

// Slider intro

if (document.querySelector('.slider-intro__wrapper')) {
    new Swiper('.slider-intro__wrapper', {
        slidesPerView: 1,
        speed: 800,
        preloadImages: false,
        parallax: true,
        // Arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Scrollbar
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        breakpoints: {
            320: {
                direction: 'horizontal',
                spaceBetween: 0,
            },
            768: {
                direction: 'vertical',
                spaceBetween: 32,
            },
        },
        autoplay: {
            delay: 5000,
        }
    });
}

// Slider survey

if (document.querySelector('.survey__slider-wrapper')) {
    new Swiper('.survey__slider-wrapper', {
        allowTouchMove: false,
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        speed: 800,
        watchOverflow: false,
        // Arrows
        navigation: {
            nextEl: '.survey__slider-wrapper .survey__slide-btn',
        },
    });
}
;

window.onload = function () {
    let header = document.querySelector('.header');

    header.classList.toggle("_scroll", header.scrollTop > 50 || document.documentElement.scrollTop > 50);

    const body = document.body;

    const burgerBtn = document.querySelector('.top-header__left-burger');
    const menu = document.querySelector('.header__bottom');

    const search = document.querySelector('.top-header__left-search');

    document.addEventListener('click', documnetActions);

    function documnetActions(e) {
        const targetElement = e.target;

        // Burger menu
        if (targetElement.classList.contains('top-header__left-burger') && !burgerBtn.classList.contains('_active')) {
            burgerBtn.classList.add('_active');
            menu.classList.add('_active');
            document.querySelector('.top-header').classList.add('_active');
            if (window.innerWidth < 768) {
                body.classList.add('_lock');
            }
        } else if (!targetElement.closest('.header__bottom') || targetElement.classList.contains('top-header__left-burger')) {
            burgerBtn.classList.remove('_active');
            menu.classList.remove('_active');
            document.querySelector('.top-header').classList.remove('_active');
            if (window.innerWidth < 768) {
                body.classList.remove('_lock');
            }
        }
        //Search
        if (targetElement.classList.contains('search-header__btn') && !search.classList.contains('_active')) {
            search.classList.add('_active');
        } else if (!targetElement.closest('.search-header__form') || targetElement.classList.contains('search-header__btn')) {
            search.classList.remove('_active');
        }
        // Load more projects
        if (targetElement.classList.contains('projects__footer-btn')) {
            getProjects(targetElement);
            e.preventDefault();
        }
        // Modal application
        if (targetElement.classList.contains('modal-application')) {
            document.querySelector('.modal-application').classList.remove('_active');
            body.classList.remove('_modal-open');
        }
    }

    // Header

    window.onscroll = function () {
        header.classList.toggle("_scroll", header.scrollTop > 50 || document.documentElement.scrollTop > 50);
    };

    // Page padding

    document.querySelector('.intro').style.paddingTop = document.querySelector('.header').offsetHeight + 'px';;

    // Sliders

    //BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');

            if (slider.classList.contains('_swiper_scroll')) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add('swiper-scrollbar');
                slider.appendChild(sliderScroll);
            }
        }
        if (slider.classList.contains('_gallery')) {
            //slider.data('lightGallery').destroy(true);
        }
    }
    sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
        const sliderScrollItem = sliderScrollItems[index];
        const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
        const sliderScroll = new Swiper(sliderScrollItem, {
            observer: true,
            observeParents: true,
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: sliderScrollBar,
                draggable: true,
                snapOnRelease: false
            },
            mousewheel: {
                releaseOnEdges: true,
            },
        });
        sliderScroll.scrollbar.updateSize();
    }
}


function sliders_bild_callback(params) { }

// Slider intro

if (document.querySelector('.slider-intro__wrapper')) {
    new Swiper('.slider-intro__wrapper', {
        slidesPerView: 1,
        speed: 800,
        preloadImages: false,
        parallax: true,
        // Arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Scrollbar
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        breakpoints: {
            320: {
                direction: 'horizontal',
                spaceBetween: 0,
            },
            768: {
                direction: 'vertical',
                spaceBetween: 32,
            },
        },
        autoplay: {
            delay: 5000,
        }
    });
}

// Slider survey

if (document.querySelector('.survey__slider-wrapper')) {
    new Swiper('.survey__slider-wrapper', {
        allowTouchMove: false,
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        speed: 800,
        watchOverflow: false,
        // Arrows
        navigation: {
            nextEl: '.survey__slider-wrapper .survey__slide-btn',
        },
    });
}
;

    // Modal application

    if (document.querySelector('.intro__btn')) {
        document.querySelector('.intro__btn').addEventListener('click', e => {
            e.preventDefault();
            if (!document.querySelector('.modal-application').classList.contains('_modal-lock')) {
                document.querySelector('.modal-application').classList.add('_active');
                body.classList.add('_modal-open');
            }
        });
    }

    document.querySelector('.modal-application__btn').addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.modal-application__content').classList.remove('_active');
        document.querySelector('.modal-application__gratitude').classList.add('_active');
        document.querySelector('.modal-application').classList.add('_modal-lock');
    });

    document.querySelector('.modal-application__gratitude-btn').addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.modal-application').classList.remove('_active');
        document.querySelector('.modal-application__gratitude').classList.remove('_active');
        body.classList.remove('_modal-open');
    });

    document.querySelector('.modal-application__close').addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.modal-application').classList.remove('_active');
        body.classList.remove('_modal-open');
    });

    // Slider survey count

    const sliderSurveyBtns = document.querySelectorAll('.survey__slide-btn');
    const sliderSurveyProgressItems = document.querySelectorAll('.survey__progressbar-item');

    sliderSurveyBtns.forEach(item => {
        item.addEventListener('click', e => {
            sliderSurveyProgressItems[item.closest('.survey__slide').dataset.sliderNumber].classList.add('_fill');
        });
    });

    // Slider survey choice

    const sliderSurveySlides = document.querySelectorAll('[data-slider-type]');

    sliderSurveySlides.forEach(element => {
        if (element.dataset.sliderType === "plenty") {
            const sliderSurveyItems = element.querySelectorAll('.survey__item');

            sliderSurveyItems.forEach(item => {
                item.addEventListener('click', e => {
                    item.classList.add('_checked');
                    item.closest('.survey__slide').querySelector('.survey__slide-btn').classList.remove('_disabled');
                })
            })
        } else {
            const sliderSurveyItems = element.querySelectorAll('.survey__item');

            sliderSurveyItems.forEach(item => {
                item.addEventListener('click', e => {
                    if (element.querySelector('.survey__item._checked')) {
                        element.querySelector('.survey__item._checked').classList.remove('_checked');
                    }
                    item.classList.add('_checked');
                    item.closest('.survey__slide').querySelector('.survey__slide-btn').classList.remove('_disabled');
                })
            })
        }

    });

    // Projects filters 

    const projectFiltersBtns = document.querySelector('.projects__filters').querySelectorAll('.filters__btn');

    projectFiltersBtns.forEach(item => {
        item.addEventListener('click', e => {
            if (!e.currentTarget.classList.contains('_choiced')) {
                document.querySelector('.filters__btn._choiced').classList.remove('_choiced');
                e.currentTarget.classList.add('_choiced');
                let projectFilterBtnType = e.currentTarget.dataset.projectType;
                let projectItems = document.querySelectorAll('.projects__item');
                projectItems.forEach(element => {
                    if (element.dataset.projectType === projectFilterBtnType) {
                        element.classList.remove('_hide');
                    } else {
                        element.classList.add('_hide');
                    }
                });
            }
        });
    })

    function updateProjectItems() {
        document.querySelector('.projects__body').querySelectorAll(`[data-project-type='${document.querySelector('.filters__btn.btn._choiced').dataset.projectType}']`).forEach(item => {
            item.classList.remove('_hide');
        });
    }

    updateProjectItems();

    // Load more projects

    async function getProjects(button) {
        if (!button.classList.contains('_hold')) {
            button.classList.add('_hold');
            const file = "json/projects.json";
            let response = await fetch(file, {
                method: "GET"
            });
            if (response.ok) {
                let result = await response.json();
                loadProjects(result);
                button.classList.remove('_hold');
                button.remove();
                updateProjectItems();
            } else {
                alert("Ошибка");
            }
        }
    }

    function loadProjects(data) {
        const projectsBody = document.querySelector('.projects__body');

        data.projects.forEach(item => {
            const projectsId = item.id;
            const projectsType = item.type;
            const projectsUrl = item.url;
            const projectsTitle = item.title;
            const projectsImage = item.image;

            let projectsTemplateStart = `<a data-project-id="${projectsId}" data-project-type="${projectsType}" href="${projectsUrl}" class="projects__item item-project _hide"`;
            let projectsTemplateEnd = `</a>`;

            let projectsTemplateImage = `
                <div class="item-project__img">
                    <img src="img/main/projects/${projectsImage}" alt="">
                </div>
            `;

            let projectsTemplateTitle = `
            <div class="item-project__text">
                ${projectsTitle}
            </div>
            `;

            let projectsTemplate = '';
            projectsTemplate += projectsTemplateStart;
            projectsTemplate += projectsTemplateImage;
            projectsTemplate += projectsTemplateTitle;
            projectsTemplate += projectsTemplateEnd;

            projectsBody.insertAdjacentHTML('beforeend', projectsTemplate);

            ibg();
        });
    }

    // AOS init

    AOS.init({
        once: true
    });
	
	ibg();
}
