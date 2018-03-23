<?php

/**
 * Class Tribe__RAT__Scripts
 *
 * @since TBD
 */
class Tribe__RAT__Scripts {
	/**
	 * @var Tribe__RAT__APIs__List
	 */
	protected $apis;

	/**
	 * Tribe__RAT__Scripts constructor.
	 *
	 * @since TBD
	 *
	 * @param Tribe__RAT__APIs__List $apis
	 */
	public function __construct( Tribe__RAT__APIs__List $apis ) {
		$this->apis = $apis;
	}

	/**
	 * Enqueues the plugin vendor scripts.
	 *
	 * @since TBD
	 */
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

	/**
	 * Enqueues the plugin own scripts.
	 *
	 * @since TBD
	 */
	public function enqueue_own_scripts() {
		$min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_style( 'mtrat-style', plugins_url( '/src/resources/css/mtrat-style.css', mtrat()->getVar( 'main-file' ) ) );

		wp_enqueue_script( 'mtrat-js', plugins_url( "/src/resources/js/dist/mtrat-script{$min}.js", mtrat()->getVar( 'main-file' ) ), array(
			'react',
			'react-dom',
			'redux',
			'react-redux',
			'jquery',
			'renderjson',
		), mtrat()->getVar( 'version' ), true );
	}

	/**
	 * Localizes the plugin data on the page.
	 *
	 * @since TBD
	 */
	public function localize_data() {
		$data = array(
			'l10n'  => array(
				'request-button-text' => __( 'Request', 'mtrat' ),
				'loading-text'        => __( 'Making the request...', 'mtrat' ),
				'apis-title'          => __( 'Available APIs', 'mtrat' ),
				'no-apis'             => __( 'There are no WP REST APIs on the site.', 'mtrat' ),
				'routes-title'        => __( 'Available Routes for the current API', 'mtrat' ),
				'api-no-routes'       => __( 'There are no routes for this API.', 'mtrat' ),
				'route-no-args'       => __( 'This route has no arguments.', 'mtrat' ),
				'route-no-methods'    => __( 'This route has no methods.', 'mtrat' ),
				'request-title'       => __( 'Available arguments for the current route', 'mtrat' ),
			),
			'state' => array(
				'apis'     => $this->get_apis(),
				'users'    => get_users(),
				'response' => [
					'responseText' => json_encode( [ __( 'Make a request', 'mtrat' ) => __( 'and see the response here.', 'mtrat' ) ] ),
					'status'       => '',
				],
			),
			'nonce' => wp_create_nonce( 'wp_rest' ),
			'url'   => untrailingslashit( rest_url() ),
		);
		wp_localize_script( 'mtrat-js', 'mtrat', $data );
	}

	/**
	 * Returns the compiled list of available WordPress REST APIs
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	protected function get_apis() {
		if ( ! did_action( 'rest_api_init' ) ) {
			do_action( 'rest_api_init', rest_get_server() );
		}

		return [ 'all' => $this->apis->get_list() ];
	}
}
