import Product from '../../blocks/product/product';

require('./index.scss');
const json = require('../../data/index/index.json');

const mapProduct = new Product(json);
mapProduct.initMap([55.76, 37.64], 19);
