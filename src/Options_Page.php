<?php

class Tribe__RAT__Options_Page {

	public function register_menu() {
		add_menu_page(
			'The Events Calendar REST API Tester',
			'TEC REST Tester',
			'administrator',
			'mtrat-tester',
			array( $this, 'render' )
		);
	}

	public function enqueue_scripts() {
		if ( empty( $_GET['page'] ) || 'mtrat-tester' !== $_GET['page'] ) {
			return;
		}

		wp_enqueue_style(
			'mtrat-style',
			plugins_url( '/assets/css/mtrat-style.css', mtrat()->getVar( 'mtrat.main-file' ) )
		);

		wp_register_script(
			'renderjson',
			plugins_url( '/node_modules/renderjson/renderjson.js', mtrat()->getVar( 'mtrat.main-file' ) )
		);

		wp_enqueue_script(
			'mtrat-js',
			plugins_url( '/assets/js/mtrat-script.js', mtrat()->getVar( 'mtrat.main-file' ) ),
			array( 'jquery', 'renderjson' )
		);

		wp_localize_script( 'mtrat-js', 'mtrat', array(
			'button_text'                  => 'Request',
			'button_loading_response_text' => 'Making the request...',
		) );
	}

	public function render() {
		$tabs = new Tribe__Tabbed_View();
		$tabs->set_url( '?page=mtrat-tester' );

		/** @var \Tribe__Events__REST__V1__Main $rest_main */
		$rest_main = tribe( 'tec.rest-v1.main' );
		$rest_main->register_endpoints( false );
		/** @var \Tribe__Documentation__Swagger__Builder_Interface $rest_documentation */
		$rest_documentation = tribe( 'tec.rest-v1.endpoints.documentation' );
		$endpoints          = $rest_documentation->get_registered_documentation_providers();

		ksort( $endpoints );

		$priority = 0;
		foreach ( $endpoints as $path => $endpoint ) {
			$tabbed_view = new Tribe__RAT__Tabs__Endpoint( $tabs, sanitize_title( $path ) );
			$tabbed_view->set_label( esc_html( $path ) );
			$tabbed_view->set_endpoint( $endpoint );
			$tabbed_view->set_priority( $priority );
			$tabs->register( $tabbed_view );
			$priority += 1;
		}

		echo '<h1>TEC REST API testing tool</h1>';
		echo '<p>Make requests and see stuff happen!</p>';

		echo $tabs->render();

		/** @var Tribe__RAT__Tabs__Endpoint $current */
		$current = $tabs->get_active();
		/** @var \Tribe__Documentation__Swagger__Provider_Interface $current_endpoint */
		$current_endpoint = $current->get_endpoint();
		$current_path     = array_search( $current_endpoint, $endpoints );
		$current_url      = tribe_events_rest_url( $current_path );

		$users_query = new WP_User_Query( array( 'orderby' => 'login' ) );
		$users       = $users_query->get_results();

		$is_documentation = $current_endpoint instanceof Tribe__Documentation__Swagger__Builder_Interface ? true : false;

		$json = $is_documentation
			? json_encode( $current_endpoint->get_documentation() )
			: '';

		$documentation      = $current_endpoint->get_documentation();
		$documentation_json = json_encode( $documentation );
		$methods_map = array(
			'get'    => explode( ', ', WP_REST_Server::READABLE ),
			'post'   => explode( ', ', WP_REST_Server::EDITABLE ),
			'delete' => explode( ', ', WP_REST_Server::DELETABLE ),
		);

		/** @noinspection PhpIncludeInspection */
		include mtrat()->getVar( 'mtrat.templates' ) . '/options-page.php';
	}
}
