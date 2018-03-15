<?php

class Tribe__RAT__APIs__List {

	/**
	 * @var array|null A list of the available WP REST APIs in the shape [ <namespace> => [ <route> => [ <route data> ] ] ]
	 */
	protected $apis = null;

	public function filter_wp_rest_server_class() {
		return 'Tribe__RAT__APIs__Server';
	}

	public function compile( Tribe__RAT__APIs__Server $server ) {
		if ( is_array( $this->apis ) ) {
			return;
		}

		$namespaces = $server->get_full_namespaces();

		if ( count( $namespaces ) === 0 ) {
			$this->apis = array();
		}

		// add the root namespace
		$namespaces = array_merge( array( '/' => array( '/' => array() ) ), $namespaces );
		$routes     = $server->get_routes();

		$this->apis = array_combine(
			array_keys( $namespaces ),
			array_map( array( $this, 'init_namespace_data' ), array_keys( $namespaces ) )
		);

		foreach ( $namespaces as $namespace => $namespace_routes ) {
			foreach ( $namespace_routes as $namespace_route => $route_data ) {
				$this_route_data = $routes[ $namespace_route ];
				foreach ( $this_route_data as &$route_data_entry ) {
					$route_data_entry['route'] = $namespace_route;
				}
				$this->apis[ $namespace ]['routes'][] = call_user_func_array( 'array_merge', $this_route_data );
			}
		}
	}

	public function get_list() {
		return array_values( $this->apis );
	}

	protected function init_namespace_data( $namespace ) {
		$name = $this->get_api_name( $namespace );

		return array(
			'name'      => $name,
			'slug'      => sanitize_title( $name ),
			'namespace' => $namespace,
			'routes'    => array(),
		);
	}

	protected function get_api_name( $namespace ) {
		$map = array(
			'/' => 'Root',
			'oembed/1.0' => 'Oembed v1',
			'wp/v2' => 'WordPress v2',
			'tribe/events/v1' => 'The Events Calendar v1',
		);

		$map = apply_filters( 'tribe_rest_api_tester_api_name_map', $map );

		return isset( $map[ $namespace ] ) ? $map[ $namespace ] : $namespace;
	}
}