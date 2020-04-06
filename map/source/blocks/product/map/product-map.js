import ymaps from 'ymaps';

require('./product-map.scss');

export default class ProductMap {
	constructor(json, container) {
		this.json = json;
		this.missItem = 0;
		this.container = container;
		this.items = container.querySelectorAll('.product__item');
		this.init();
	}
	resetActive() {
		this.items.forEach((item) => {
			item.classList.remove('product__item--active');
		});
	}

	static changeMarker(map, index, reset) {
		if (reset) {
			const geoObject = map.geoObjects.get(index);
			geoObject.options.set('preset', 'islands#blueIcon');
		} else {
			const geoObject = map.geoObjects.get(index);
			geoObject.options.set('preset', 'islands#nightIcon');
		}
	}

	addMark(maps, map, arrItems) {
		this.json.product.items.forEach((item, index) => {
			if (item.title && item.content && item.address && item.mapPoint) {
				const placeMark = new maps.Placemark(item.mapPoint.coords, {
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
					ProductMap.changeMarker(map, indexItem);
				});
				arrItems[indexItem].addEventListener('mouseleave', () => {
					ProductMap.changeMarker(map, indexItem, true);
				});

				placeMark.events
					.add('balloonclose', () => {
						arrItems[indexItem].classList.remove('product__item--active');
					})
					.add('click', () => {
						this.resetActive(arrItems);
						ProductMap.changeMarker(map, indexItem, true);
						arrItems[indexItem].classList.add('product__item--active');
					})
					.add('mouseenter', () => {
						ProductMap.changeMarker(map, indexItem);
						arrItems[indexItem].classList.add('product__item--active');
					})
					.add('mouseleave', () => {
						ProductMap.changeMarker(map, indexItem, true);
						arrItems[indexItem].classList.remove('product__item--active');
					});

				map.geoObjects.add(placeMark);
			} else {
				this.missItem += 1;
			}
		});
	}

	init() {
		ymaps
			.load('https://api-maps.yandex.ru/2.1/?apikey=d447d67d-d2b3-4db7-bba0-8a48fb1310f0&lang=ru_RU')
			.then((maps) => {
				const map = new maps.Map('product-map', {
					center: [55.76, 37.64],
					zoom: 14,
				});
				this.addMark(maps, map, this.items);
			})
			.catch(() => {
				this.container.remove();
			});
	}
}
