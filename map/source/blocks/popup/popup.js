import api from '../../base/script/api';

const bodyLock = require('body-scroll-lock');

require('./layout/popup-layout.scss');
require('./popup.scss');

const popupTemplate = require('./popup-js.pug');

export default class Popup {
	constructor(options) {
		this.layout = options.layout ? options.layout : document.querySelector('.popup-layout');
		this.template = options.customTemplate ? options.customTemplate : popupTemplate;
		this.create(options);
	}

	create(options) {
		if (this.layout) {
			const popup = this.layout.querySelector(`#${options.name}`);
			if (!popup) {
				api.get(options.data).then((resp) => {
					this.layout.insertAdjacentHTML('beforeend', this.template({ info: resp.data }));

					setTimeout(() => this.init(options), 0);
				});
			}
		}
	}

	init(options) {
		this.popup = document.querySelector(`#${options.name}`);

		if (this.popup) {
			this.popupContent = options.content ? this.popup.querySelector(`${options.content}`) :
				this.popup.querySelector('.popup__content-wrap');
			this.close_btn = options.close_btn ? this.popup.querySelector(`${options.close_btn}`) :
				this.popup.querySelector('.popup__close');

			if (this.close_btn) {
				this.close_btn.addEventListener('click', this.close.bind(this));
			}

			this.popup.addEventListener('mousedown', (event) => {
				if ((event.target === this.popup || event.target === this.popupContent)
					&& !this.popupContent.contains(event.target)) {
					this.close();
				}
			});

			this.open();
		}
	}

	open() {
		this.closeActive();

		bodyLock.disableBodyScroll(this.popup);
		this.popup.classList.add('popup--open');
	}

	close() {
		this.popup.classList.remove('popup--open');
		bodyLock.clearAllBodyScrollLocks();
		window.dispatchEvent(new window.CustomEvent('popupClosed'));
	}

	closeActive() {
		const openedPopup = this.layout.querySelector('.popup--open') ||
			document.querySelector('.popup--open');

		if (openedPopup) {
			openedPopup.classList.remove('popup--open');
			bodyLock.clearAllBodyScrollLocks();
			window.dispatchEvent(new window.CustomEvent('popupClosed'));
		}
	}
}
