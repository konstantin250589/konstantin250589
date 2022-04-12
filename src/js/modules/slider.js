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

export default slider;