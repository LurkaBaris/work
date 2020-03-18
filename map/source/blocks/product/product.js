import ProductMap from './map/product-map';

require('./product.scss');


export default class Product {
	constructor(json) {
		this.json = json;
	}

	render() {
		const container = document.createElement('div');
		container.className = 'product__content';

		this.json.product.items.forEach((val) => {
			const item = document.createElement('div');
			const itemTitle = document.createElement('div');
			const itemParagraph = document.createElement('div');
			const itemAddress = document.createElement('div');

			item.className = 'product__item';
			itemTitle.className = 'product__title';
			itemParagraph.className = 'product__paragraph';
			itemAddress.className = 'product_address';

			itemTitle.innerHTML = val.title;
			itemParagraph.innerHTML = val.content;
			itemAddress.innerHTML = val.address;

			item.append(itemTitle, itemParagraph, itemAddress);
			container.append(item);
		});
		const main = document.querySelectorAll('.product');
		for (let i = main.length - 1; i >= 0; i -= 1) {
			const child = main[i].querySelector('.product__content');
			if (!child) {
				main[i].append(container);
			}
		}
		// main.forEach((item, index) => {
		//     const child = item.querySelector('.product__content');
		//     if (!child) {
		//         item.append(container);
		//     }
		// });
		return container;
	}

	initMap(coords, zoom) {
		const container = this.render();
		const myMap = new ProductMap(this.json, container);
		myMap.init(coords, zoom);
	}
}
