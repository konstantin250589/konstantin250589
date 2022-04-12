import card from "./modules/card";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";

window.addEventListener('DOMContentLoaded', () => {

	card();
	forms();
	modal('[data-modal]', '.overlay', '[data-close]');
	slider({
		wrapper: '.carousel__slider',
		slide: '.carousel__slide',
		prevArrow: '.carousel__slider-prev',
		nextArrow: '.carousel__slider-next',
		totalCounter: '#total',
		currentCounter: '#current'
	});
});