import ProductMap from './map/product-map';

require('./product.scss');


export default class Product {
	constructor(json, container) {
		this.json = json;
		this.container = container;
		this.initMap();
	}

	initMap() {
		new ProductMap(this.json, this.container);
	}
}
