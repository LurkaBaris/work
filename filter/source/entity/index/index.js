import 'bootstrap';
import Main from '../../blocks/main/main';

require('./index.scss');

document.querySelectorAll('.main').forEach((item) => {
	new Main(item);
});

