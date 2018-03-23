<?php
/**
 * Autoloads the plugin classes.
 *
 * @since TBD
 *
 * @param string $class
 *
 * @return bool
 */
function mtrat_autoload( $class ) {
	$prefix = 'Tribe__RAT__';
	if ( 0 === strpos( $class, $prefix ) ) {
		$class_path = str_replace( array( $prefix, '__' ), array(
			'',
			DIRECTORY_SEPARATOR,
		), $class );
		/** @noinspection PhpIncludeInspection */
		require dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $class_path . '.php';

		return true;
	}

	return false;
}

spl_autoload_register( 'mtrat_autoload' );
