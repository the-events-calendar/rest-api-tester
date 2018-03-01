<?php
/*
Plugin Name: REST API Tester
Plugin URI: https://tri.be/
Description: Test WordPress REST APIs from within WordPress
Version: 0.1.0
Author: Modern Tribe, Inc.
*/

include 'src/autoload.php';
include 'vendor/autoload_52.php';

// after TEC
add_action( 'plugins_loaded', 'mtrat_init', 99 );

function mtrat( $classOrInterface = null ) {
	static $container;

	if ( null == $classOrInterface ) {
		if ( null === $container ) {
			$container = new tad_DI52_Container();
		}

		return $container;
	}

	return $container->make( $classOrInterface );
}

function mtrat_init() {
	$container= mtrat();

	$container->setVar( 'main-file', __FILE__ );
	$container->setVar( 'templates', dirname( __FILE__ ) . '/src/templates' );

	add_action( 'admin_menu', $container->callback( 'Tribe__RAT__Options_Page', 'register_menu' ) );

	add_action( 'admin_enqueue_scripts', $container->callback( 'Tribe__RAT__Options_Page', 'enqueue_scripts' ) );
	add_action( 'rest_api_init', $container->callback( 'Tribe__RAT__Nonce', 'maybe_spoof_user' ) );
}
