const utils = require('loader-utils');

module.exports = function(source) {
	const options = utils.getOptions(this);
	const stylesPath = options.baseStyles.replace(/(\\)/g, '/');
	if (source.indexOf('_vars.scss') === -1) {
		source = `@import "${stylesPath}/_function.scss";
							@import "${stylesPath}/_vars.scss";\n
							@import "${stylesPath}/_media.scss";\n
							${source}`;
	}
	return source;
};
