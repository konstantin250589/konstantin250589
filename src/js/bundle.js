/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/card.js":
/*!********************************!*\
  !*** ./src/js/modules/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function card() {
    class Card {
		constructor(img, alt, title, parentSelector, ...classes) {
			this.img = img;
			this.alt = alt;
			this.title= title;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
		}

		render() {
			const block = document.createElement('div');

			if (this.classes.length === 0) {
                this.element = 'catalog__item'
                block.classList.add(this.element);
            } else {
                this.classes.forEach(className => block.classList.add(className));
            }

			block.innerHTML = `
					<img src="${this.img}" alt="${this.alt}">
					<div class="catalog__header">${this.title}</div>
			`;

			this.parent.append(block);
		}
	}

	new Card('img/engine.jpg', 'engine', 'Двигатель', '.catalog .catalog__wrapper').render();
	new Card('img/transmission.png', 'transmossion', 'Трансмиссия', '.catalog .catalog__wrapper').render();
	new Card('img/car.jpg', 'car', 'Кузов', '.catalog .catalog__wrapper').render();
	new Card('img/suspension.jpg', 'suspension', 'Подвеска', '.catalog .catalog__wrapper').render();
	new Card('img/steering.jpg', 'steering', 'Рулевое управление', '.catalog .catalog__wrapper').render();
	new Card('img/generator.jpg', 'generator', 'Электрооборудование', '.catalog .catalog__wrapper').render();
	new Card('img/headlight.png', 'light', 'Оптика', '.catalog .catalog__wrapper').render();
	new Card('img/signal.png', 'signal', 'Стоп-сигнал', '.catalog .catalog__wrapper').render();
	new Card('img/radiator.jpg', 'radiator', 'Система охлаждения', '.catalog .catalog__wrapper').render();
	new Card('img/wheels.jpg', 'wheels', 'шины и диски', '.catalog .catalog__wrapper').render();
	new Card('img/glass.jpg', 'glass', 'стекла', '.catalog .catalog__wrapper').render();


	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, alt, title}) => {
				new Card(img, alt, title, '.catalog .catalog__wrapper').render();
			});
		});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms() {
    const forms = document.querySelectorAll('form');

	const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindpostData(item);
    });


    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

			(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure);
			}).finally(() => {
				form.reset();
			})
        });
    }

	function showThanksModal(message) {

		const modalDialog = document.querySelector('.modal');

		modalDialog.classList.add('hide');
		document.querySelector('.overlay').classList.add('show');
		document.body.style.overflow = 'hidden';

		const thanksModal = document.createElement('div');

		thanksModal.classList.add('form__modal');

		thanksModal.innerHTML = `
			<div class="form__modal-subtitle">${message}</div>
		`;

		document.querySelector('.overlay').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
			document.querySelector('.overlay').classList.remove('show');
            document.body.style.overflow = '';
        }, 4000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);
	

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(triggerSelector, modalSelector, closeSelector) {

        const btnsModal = document.querySelectorAll(triggerSelector),
              modalClose = document.querySelector(closeSelector),
              modal = document.querySelector(modalSelector);

        const openModal = () => {
            modal.classList.add('show', 'fade');
            document.body.style.overflow = 'hidden';
        }

        const closeModal = () => {
            modal.classList.remove('show', 'fade');
            document.body.style.overflow = '';
        }

        btnsModal.forEach(btn => {
            btn.addEventListener('click', () => {
                openModal();
                clearInterval(timerId);
            });
        });

        modalClose.addEventListener('click', (e) => {
            closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
                
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        });

        const timerId = setTimeout(openModal, 4000);

        const showModalByScroll = () => {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
				clearInterval(timerId);

                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);
    }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({wrapper, slide, prevArrow, nextArrow, totalCounter, currentCounter}) {
    const slides = document.querySelectorAll(slide),
		  slider = document.querySelector(wrapper),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter);

    let slideIndex = 1;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlide() {

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        if (slideIndex < 1) {
            slideIndex = slides.length;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        slides.forEach(slide => {
            slide.classList.add('hide');
            slide.classList.remove('show', 'fade');
        });

        slides[slideIndex - 1].classList.add('show', 'fade');
        slides[slideIndex - 1].classList.remove('hide');



    }

    showSlide(slideIndex);

	const indicators = document.createElement('ol'),
		  dots = [];

	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
			dot.setAttribute('data-slide-to', i + 1);
			dot.classList.add('dot');

			if (i == 0) {
				dot.style.backgroundColor = '#FFA500';
				dot.style.opacity = 1;
			}

			indicators.append(dot);
			dots.push(dot);
	};

		  

    function nextSlide(n) {
        showSlide(slideIndex += n);
    }

	function prevSlide(n) {
        showSlide(slideIndex -= n);
    }

	function dotColor() {
		dots[slideIndex - 1].style.opacity = 1;
        dots[slideIndex - 1].style.backgroundColor = '#FFA500';
	}

    next.addEventListener('click', () => {
        nextSlide(1);

		dots.forEach(dot => {
			dot.style.opacity = .5;
			dot.style.backgroundColor = '#fff';

		});
		dotColor();
    });

    prev.addEventListener('click', () => {
        prevSlide(1);

		dots.forEach(dot => {
			dot.style.opacity = .5;
			dot.style.backgroundColor = '#fff';
		});

		dotColor();
		showSlide();
    });

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			dot = e.target.getAttribute('data-slide-to');

			slideIndex = dot;

			dots.forEach(dot => {
				dot.style.opacity = .5;
				dot.style.backgroundColor = '#fff';
			});
			dotColor();
			showSlide();
		});
	});

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}


const getData = async (url) => {
    const res = await fetch(url, {
    });
    if (!res.ok) {
        throw new Error();
    }

    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/card */ "./src/js/modules/card.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");





window.addEventListener('DOMContentLoaded', () => {

	(0,_modules_card__WEBPACK_IMPORTED_MODULE_0__.default)();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_1__.default)();
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.overlay', '[data-close]');
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)({
		wrapper: '.carousel__slider',
		slide: '.carousel__slide',
		prevArrow: '.carousel__slider-prev',
		nextArrow: '.carousel__slider-next',
		totalCounter: '#total',
		currentCounter: '#current'
	});
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map