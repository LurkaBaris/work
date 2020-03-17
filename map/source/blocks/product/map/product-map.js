/* eslint-disable no-undef */
require('./product-map.scss');

export default class ProductMap {
	constructor(json) {
		this.json = json;
		this.countMiss = 0;
		this.items = document.querySelectorAll('.product__item');
	}
	// eslint-disable-next-line no-console

	resetActive() {
		this.items.forEach((item) => {
			item.classList.remove('product__item--active');
		});
	}
/* 	const resetActive = (arrItems) => {
		arrItems.forEach((item) => {
			item.classList.remove('product__item--active');
		});
	}; */
	changeMarker(map, index, reset){
		if (reset) {
			const geoObject = map.geoObjects.get(index);
			geoObject.options.set('preset', 'islands#blueIcon');
		} else {
			const geoObject = map.geoObjects.get(index);
			geoObject.options.set('preset', 'islands#nightIcon');
		}
	}

	addMark(map, arrItems) {
		this.json.product.items.forEach((item, index) => {
			if (!item.mapPoint.coords) {
				this.countMiss += 1;
				return;
			}

			const placeMark = new ymaps.Placemark(item.mapPoint.coords, {
				balloonContentHeader: item.mapPoint.balloonHeader,
				balloonContentBody: item.mapPoint.balloonBody,
				balloonContentFooter: item.mapPoint.ballonFooter,
				hintContent: item.mapPoint.hint,
			});

			const indexTrue = (index === 0) ? index : index - this.countMiss;

			arrItems[index].addEventListener('click', () => {
				this.resetActive(arrItems);
				const geoObject = map.geoObjects.get(indexTrue);
				geoObject.balloon.open(map.getCenter());
				arrItems[index].classList.add('product__item--active');
			});

			arrItems[index].addEventListener('mouseenter', () => {
				this.changeMarker(map, indexTrue);
			});

			arrItems[index].addEventListener('mouseleave', () => {
				this.changeMarker(map, indexTrue, true);
			});

			placeMark.events
				.add('balloonclose', () => {
					arrItems[index].classList.remove('product__item--active');
				})
				.add('click', () => {
					this.resetActive(arrItems);
					this.changeMarker(map, indexTrue, true);
					arrItems[index].classList.add('product__item--active');
				})
				.add('mouseenter', () => {
					this.changeMarker(map, indexTrue);
					arrItems[index].classList.add('product__item--active');
				})
				.add('mouseleave', () => {
					this.changeMarker(map, indexTrue, true);
					arrItems[index].classList.remove('product__item--active');
				});

			map.geoObjects.add(placeMark);
		});
	}

	init(coords, zoom) {
		if (typeof NodeList.prototype.forEach !== 'function') {
			NodeList.prototype.forEach = Array.prototype.forEach;
		}
		ymaps.ready(() => {
			const myMap = new ymaps.Map('product-map', {
				center: coords,
				zoom,
			});
			const items = document.querySelectorAll('.product__item');/*уйдет*/
			this.addMark(myMap, items);
		});
	}

/* 	const changeMarker = (map, index, reset) => {
		if (reset) {
			const geoObject = map.geoObjects.get(index);
			geoObject.options.set('preset', 'islands#blueIcon');
		} else {
			const geoObject = map.geoObjects.get(index);
			geoObject.options.set('preset', 'islands#nightIcon');
		}
	}; */

	/* const addMark = (map, arrItems) => {
		json.product.items.forEach((item, index) => {
			if (!item.mapPoint.coords) {
				this.countMiss += 1;
				return;
			}

			const placeMark = new ymaps.Placemark(item.mapPoint.coords, {
				balloonContentHeader: item.mapPoint.balloonHeader,
				balloonContentBody: item.mapPoint.balloonBody,
				balloonContentFooter: item.mapPoint.ballonFooter,
				hintContent: item.mapPoint.hint,
			});

			const indexTrue = (index === 0) ? index : index - this.countMiss;

			arrItems[index].addEventListener('click', () => {
				resetActive(arrItems);
				const geoObject = map.geoObjects.get(indexTrue);
				geoObject.balloon.open(map.getCenter());
				arrItems[index].classList.add('product__item--active');
			});

			arrItems[index].addEventListener('mouseenter', () => {
				changeMarker(map, indexTrue);
			});

			arrItems[index].addEventListener('mouseleave', () => {
				changeMarker(map, indexTrue, true);
			});

			placeMark.events
				.add('balloonclose', () => {
					arrItems[index].classList.remove('product__item--active');
				})
				.add('click', () => {
					resetActive(arrItems);
					changeMarker(map, indexTrue, true);
					arrItems[index].classList.add('product__item--active');
				})
				.add('mouseenter', () => {
					changeMarker(map, indexTrue);
					arrItems[index].classList.add('product__item--active');
				})
				.add('mouseleave', () => {
					changeMarker(map, indexTrue, true);
					arrItems[index].classList.remove('product__item--active');
				});

			map.geoObjects.add(placeMark);
		});
	};

	this.init = (coords, zoom) => {
		if (typeof NodeList.prototype.forEach !== 'function') {
			NodeList.prototype.forEach = Array.prototype.forEach;
		}
		ymaps.ready(() => {
			const myMap = new ymaps.Map('product-map', {
				center: coords,
				zoom,
			});
			addMark(myMap, items);
		});
	}; */
}
