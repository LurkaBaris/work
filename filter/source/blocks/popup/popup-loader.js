class PopupLoader {
	constructor() {
		this.popups = {};
		this.Init = null;
	}

	load(options) {
		if (!this.Init) {
			import('../../blocks/popup/popup.js').then((js) => {
				this.Init = js.default;
				this.popups[`${options.name}`] = new this.Init(options);
				this.popups.closeActive = () => this.popups[`${options.name}`].closeActive();

				window.addEventListener('closePopup', (e) => {
					const { name } = e.detail;
					if (this.popups[`${name}`]) {
						this.popups[`${name}`].close();
					}
				});

				document.addEventListener('keydown', (event) => {
					if (event.keyCode === 27) {
						this.popups.closeActive();
					}
				});
			});
		} else if (this.Init) {
			if (!this.popups[`${options.name}`]) {
				this.popups[`${options.name}`] = new this.Init(options);
			} else {
				this.popups[`${options.name}`].open();
			}
		}
	}
}

const loader = new PopupLoader();
export default loader;
