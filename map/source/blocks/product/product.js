import ProductMap from './map/product-map';

require('./product.scss');


export default class Product {
	constructor(json) {
		this.json = json;
	}

	initMap(coords, zoom) {
		const myMap = new ProductMap(this.json);
		myMap.init(coords, zoom);
	}
}
