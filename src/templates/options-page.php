<?php
/**
 * The plugin main options page.
 *
 * @since TBD
 */
?>

<?php wp_nonce_field( 'mtrat', 'mtrat-nonce' ); ?>

<header>
	<h1>
		<?php esc_html_e('The Events Calendar REST API Tester', 'mtrat') ?>
	</h1>
</header>

<div id="mtrat-wrapper">
</div>

<footer>
	<p>Made with love by The Events Calendar</p>
</footer>


