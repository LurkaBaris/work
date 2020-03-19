import objectFitImages from 'object-fit-images';

require('./index.scss');

const images = document.querySelectorAll('.picture > img');

images.forEach((item) => {
	objectFitImages(item);
});
