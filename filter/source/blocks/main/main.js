import Vue from 'vue/dist/vue.min';

require('./main.scss');

// const template = require('./main.pug');

export default class Main {
	constructor(elem) {
		new Vue(({
			el: '#filter',
			data: {
				selected: '',
			},
			methods: {
				onChange() {
					const arrValue = [];
					elem.querySelectorAll('.custom-select').forEach((item) => {
						arrValue.push(item.value);
					});
					elem.querySelectorAll('.main__item').forEach((item) => {
						const itemValue = [];
						const info = item.querySelectorAll('.main__info');
						info.forEach((value, index) => {
							if (index > 0) {
								itemValue.push(value.innerHTML);
							}
						});
						arrValue.forEach((val, index) => {
							if (val === '') {
								itemValue[index] = '';
							}
						});
						if (JSON.stringify(arrValue) === JSON.stringify(itemValue)) {
							item.style.display = 'flex';
						} else {
							item.style.display = 'none';
						}
					});
				},
				inputLower(event) {
					const lowerSlider = event.target;
					const upperSlider = event.target.nextElementSibling;
					const lowerVal = +(lowerSlider.value);
					const upperVal = +(upperSlider.value);

					if (upperVal < lowerVal + 10) {
						lowerSlider.value = upperVal - 10;

						if (lowerVal === lowerSlider.min) {
							upperSlider.value = 10;
						}
					}
				},
				inputUpper(event) {
					const lowerSlider = event.target.previousElementSibling;
					const upperSlider = event.target;
					const lowerVal = +(lowerSlider.value);
					const upperVal = +(upperSlider.value);

					if (lowerVal > upperVal - 10) {
						upperSlider.value = lowerVal + 10;

						if (upperVal === upperSlider.max) {
							lowerSlider.value = +(upperSlider.max) - 10;
						}
					}
				},
			},
		}));
	}
}
