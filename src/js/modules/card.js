import {getData} from '../services/services';

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


	getData('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, alt, title}) => {
				new Card(img, alt, title, '.catalog .catalog__wrapper').render();
			});
		});
}

export default card;