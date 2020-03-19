import '@babel/polyfill';
import 'svgxuse';
import ObjectFitImages from 'object-fit-images';
import PopupLoader from '../../blocks/popup/popup-loader';

require('lazysizes');

require('./common.scss');

ObjectFitImages(null, { watchMQ: true });
window.bodyLock = require('body-scroll-lock');

window.lazySizesConfig = window.lazySizesConfig || {};
const lazySizesCustom = {
	preloadAfterLoad: true,
	expand: 600,
	expFactor: 1,
};
window.lazySizesConfig = Object.assign({}, window.lazySizesConfig, lazySizesCustom);

Array.from(document.querySelectorAll('[data-popup]')).forEach((btn) => {
	btn.addEventListener('click', () => {
		const popupName = btn.getAttribute('data-popup');
		const popupUrl = btn.getAttribute('data-popup-url');
		if (popupUrl) {
			PopupLoader.load({
				name: popupName,
				data: popupUrl,
			});
		}
	});
});
