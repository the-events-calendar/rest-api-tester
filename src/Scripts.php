<?php

class Tribe__RAT__Scripts {

	/**
	 * @var string
	 */
	protected $client = 'default';

	public function set_client( $client ) {
		$this->client = $client;
	}

	public function enqueue_vendor_scripts() {
		if ( ! wp_script_is( 'react', 'registered' ) ) {
			wp_register_script( 'react', plugins_url( '/node_modules/react/dist/react.min.js', mtrat()->getVar( 'main-file' ) ) );
		}

		if ( ! wp_script_is( 'react-dom', 'registered' ) ) {
			wp_register_script( 'react-dom', plugins_url( '/node_modules/react-dom/dist/react-dom.min.js', mtrat()->getVar( 'main-file' ) ) );
		}

		if ( ! wp_script_is( 'redux', 'registered' ) ) {
			wp_register_script( 'redux', plugins_url( '/node_modules/redux/dist/redux.min.js', mtrat()->getVar( 'main-file' ) ) );
		}

		if ( ! wp_script_is( 'react-redux', 'registered' ) ) {
			wp_register_script( 'react-redux', plugins_url( '/node_modules/react-redux/dist/react-redux.min.js', mtrat()->getVar( 'main-file' ) ) );
		}

		wp_register_script( 'renderjson', plugins_url( '/node_modules/renderjson/renderjson.js', mtrat()->getVar( 'main-file' ) ) );
	}

	public function enqueue_own_scripts() {
		wp_enqueue_style( 'mtrat-style', plugins_url( '/src/resources/css/mtrat-style.css', mtrat()->getVar( 'main-file' ) ) );

		wp_enqueue_script( 'mtrat-js', plugins_url( '/src/resources/js/dist/mtrat-script.js', mtrat()->getVar( 'main-file' ) ), array(
			'react',
			'react-dom',
			'redux',
			'react-redux',
			'jquery',
			'renderjson',
		), mtrat()->getVar('version'), true );
	}

	public function localize_data() {
		// -- l10n
		// -- redux status initial hydration
		// -- -- available REST APIs
		// -- -- safe testing to show only available and supported methods for endpoints
		// -- -- -- title, name, description, version
		// -- -- -- endpoints
		// -- -- -- -- arguments and methods
		// -- -- available users
		// -- -- nonce
		wp_localize_script( 'mtrat-js', 'mtrat', array(
			'l10n' => array(
				'request_button_text'          => 'Request',
				'button_loading_response_text' => 'Making the request...',
			),
		) );
	}
}