import Product from '../../blocks/product/product';

require('./index.scss');
const json = require('../../data/index/index.json');

document.querySelectorAll('.product').forEach((product) => {
	new Product(json, product);
});
