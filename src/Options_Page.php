<?php

class Tribe__RAT__Options_Page {

	/**
	 * @var \Tribe__RAT__Scripts
	 */
	protected $scripts;

	public function __construct(Tribe__RAT__Scripts $scripts  ) {
		$this->scripts = $scripts;
		$this->scripts->set_client('options-page');
	}

	public function register_menu() {
		add_menu_page(
			'REST API Tester',
			'REST API Tester',
			'administrator',
			'mtrat-tester',
			array( $this, 'render' )
		);
	}

	public function enqueue_scripts() {
		if ( empty( $_GET['page'] ) || 'mtrat-tester' !== $_GET['page'] ) {
			return;
		}


		$this->scripts->enqueue_vendor_scripts();
		$this->scripts->enqueue_own_scripts();
		$this->scripts->localize_data();
	}

	public function render() {
		/** @noinspection PhpIncludeInspection */
		include mtrat()->getVar( 'templates' ) . '/options-page.php';
	}
}
