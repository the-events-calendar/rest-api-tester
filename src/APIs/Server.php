<?php

class Tribe__RAT__APIs__Server extends WP_REST_Server {
	public function get_full_namespaces() {
		return $this->namespaces;
	}
}