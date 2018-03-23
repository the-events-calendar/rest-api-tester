<?php

/**
 * Class Tribe__RAT__Options_Page
 *
 * @since TBD
 */
class Tribe__RAT__Options_Page {

	/**
	 * @var \Tribe__RAT__Scripts
	 */
	protected $scripts;

	/**
	 * Tribe__RAT__Options_Page constructor.
	 *
	 * @since TBD
	 *
	 * @param Tribe__RAT__Scripts $scripts
	 */
	public function __construct( Tribe__RAT__Scripts $scripts ) {
		$this->scripts = $scripts;
	}

	/**
	 * Registers the plugin option page.
	 *
	 * @since TBD
	 */
	public function register_menu() {
		add_menu_page(
			'REST API Tester',
			'REST API Tester',
			'administrator',
			'mtrat-tester',
			array( $this, 'render' )
		);
	}

	/**
	 * Enqueues the scripts needed by the plugin.
	 *
	 * @since TBD
	 */
	public function enqueue_scripts() {
		if ( empty( $_GET['page'] ) || 'mtrat-tester' !== $_GET['page'] ) {
			return;
		}


		$this->scripts->enqueue_vendor_scripts();
		$this->scripts->enqueue_own_scripts();
		$this->scripts->localize_data();
	}

	/**
	 * Renders and prints the options page HTML.
	 *
	 * @since TBD
	 */
	public function render() {
		/** @noinspection PhpIncludeInspection */
		include mtrat()->getVar( 'templates' ) . '/options-page.php';
	}
}
