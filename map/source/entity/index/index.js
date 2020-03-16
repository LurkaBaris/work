require('./index.scss');

const json = require('../../data/product/product.json');

const items = document.querySelectorAll('.product__item');

const resetActive = () => {
	items.forEach((item) => {
		item.classList.remove('product__item--active');
	});
};

const init = () => {
	const getIndex = (event) => {
		const item = event.get('target');
		const indexItem = myMap.geoObjects.indexOf(item);
		return indexItem;
	};

	let myMap = new ymaps.Map('product-map', {
		center: [55.76, 37.64],
		zoom: 19,
	});

	json.items.forEach((item, index) => {
		placeMark = new ymaps.Placemark(item.coords, {
			balloonContentHeader: item.balloonHeader,
			balloonContentBody: item.balloonBody,
			balloonContentFooter: item.ballonFooter,
			hintContent: item.hint,
		});

		items[index].addEventListener('click', () => {
			resetActive();
			const geoObject = myMap.geoObjects.get(index);
			geoObject.balloon.open(myMap.getCenter());
			items[index].classList.add('product__item--active');
		});

		items[index].addEventListener('mouseenter', () => {
			const geoObject = myMap.geoObjects.get(index);
			geoObject.options.set('preset', 'islands#nightIcon');
		});

		items[index].addEventListener('mouseleave', () => {
			const geoObject = myMap.geoObjects.get(index);
			geoObject.options.set('preset', 'islands#blueIcon');
		});

		placeMark.events
			.add('balloonclose', (e) => {
				const indexItem = getIndex(e);
				items[indexItem].classList.remove('product__item--active');
			})
			.add('click', (e) => {
				resetActive();
				const indexItem = getIndex(e);
				items[indexItem].classList.add('product__item--active');
			});

		myMap.geoObjects.add(placeMark);
	});
};

ymaps.ready(init);
