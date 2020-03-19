/* eslint-disable no-undef */
require('./product-map.scss');

export default class ProductMap {
	constructor(json, container) {
		this.json = json;
		this.missItem = 0;
		this.items = container.querySelectorAll('.product__item');
	}
	// eslint-disable-next-line no-console
	resetActive() {
		this.items.forEach((item) => {
			item.classList.remove('product__item--active');
		});
	}

	// eslint-disable-next-line class-methods-use-this
	changeMarker(map, index, reset) {
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
			if (item.title && item.content && item.address && item.mapPoint) {
				const placeMark = new ymaps.Placemark(item.mapPoint.coords, {
					balloonContentHeader: item.mapPoint.balloonHeader,
					balloonContentBody: item.mapPoint.balloonBody,
					balloonContentFooter: item.mapPoint.ballonFooter,
					hintContent: item.mapPoint.hint,
				});

				const indexItem = (index === 0) ? index : index - this.missItem;

				arrItems[indexItem].addEventListener('click', () => {
					this.resetActive(arrItems);
					const geoObject = map.geoObjects.get(indexItem);
					geoObject.balloon.open(map.getCenter());
					arrItems[indexItem].classList.add('product__item--active');
				});

				arrItems[indexItem].addEventListener('mouseenter', () => {
					this.changeMarker(map, indexItem);
				});

				arrItems[indexItem].addEventListener('mouseleave', () => {
					this.changeMarker(map, indexItem, true);
				});

				placeMark.events
					.add('balloonclose', () => {
						arrItems[indexItem].classList.remove('product__item--active');
					})
					.add('click', () => {
						this.resetActive(arrItems);
						this.changeMarker(map, indexItem, true);
						arrItems[indexItem].classList.add('product__item--active');
					})
					.add('mouseenter', () => {
						this.changeMarker(map, indexItem);
						arrItems[indexItem].classList.add('product__item--active');
					})
					.add('mouseleave', () => {
						this.changeMarker(map, indexItem, true);
						arrItems[indexItem].classList.remove('product__item--active');
					});

				map.geoObjects.add(placeMark);
			} else {
				this.missItem += 1;
			}
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
			this.addMark(myMap, this.items);
		});
	}
}
