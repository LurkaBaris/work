import Product from '../../blocks/product/product';

require('./index.scss');
const json = require('../../data/index/index.json');

const mapProduct = new Product(json);
mapProduct.initMap([55.76, 37.64], 19);

const mapProduct2 = new Product(json);
mapProduct2.initMap([55.76, 37.64], 12);

const mapProduct3 = new Product(json);
mapProduct3.initMap([55.76, 37.64], 12);
