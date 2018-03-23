<?php

/**
 * Class Tribe__RAT__APIs__Server
 *
 * @since TBD
 */
class Tribe__RAT__APIs__Server extends WP_REST_Server {

	/**
	 * Exposes an otherwise protected server property.
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	public function get_full_namespaces() {
		return $this->namespaces;
	}
}