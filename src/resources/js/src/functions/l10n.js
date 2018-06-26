const __ = function( slug ) {
	const l10n = window.mtrat && window.mtrat.l10n ? window.mtrat.l10n : {};
	return l10n.hasOwnProperty( slug ) ? l10n[ slug ] : '';
};

module.exports = {
	__,
};
