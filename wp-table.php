<?php
/*
  Plugin Name: WP Table
  Description: Airtable-like table plugin.
  Version: 0.0.1
  Author: Will Hawks
*/

include_once( 'post-type.php' );
include_once( 'inc/debugging.php' );

add_action( 'add_meta_boxes', 'wpt_remove_publish_metabox' );
function wpt_remove_publish_metabox() {
    remove_meta_box( 'submitdiv', 'wpt-table', 'side' );
}

function wpt_enqueue_post_editor_assets() {
  $ver = get_plugin_data( plugin_dir_path( __FILE__ ) . 'wp-table.php' )['Version'];
  if (wpt_get_current_post_type() == 'wpt-table') {
    wp_enqueue_script( 'wp-table-js', plugin_dir_url( __FILE__)  . 'dist/index.js', array( 'wp-api' ), $ver, true );
    wp_enqueue_style( 'wp-table-style', plugin_dir_url( __FILE__)  . 'dist/style.css', array(), $ver);
  }
}

add_action( 'admin_enqueue_scripts', 'wpt_enqueue_post_editor_assets' );

function wpt_get_current_post_type() {
	
	global $post, $typenow, $current_screen;
	
	if ($post && $post->post_type) return $post->post_type;
	
	elseif($typenow) return $typenow;
	
	elseif($current_screen && $current_screen->post_type) return $current_screen->post_type;
	
	elseif(isset($_REQUEST['post_type'])) return sanitize_key($_REQUEST['post_type']);
	
	return null;
	
}

include_once( plugin_dir_path( __FILE__ ) . '/api/index.php' );

add_action( 'rest_api_init', function () {
  register_rest_route( 'wp-table/v1', '/save-cell', array(
    'methods' => 'POST',
    'callback' => 'save_cell',
    'permission_callback' => function() {
      return current_user_can(  'publish_posts' );
    }
  ));
  register_rest_route( 'wp-table/v1', '/save-heading', array(
    'methods' => 'POST',
    'callback' => 'save_heading',
    'permission_callback' => function() {
      return current_user_can(  'publish_posts' );
    }
  ));
  register_rest_route( 'wp-table/v1', '/new-field', array(
    'methods' => 'POST',
    'callback' => 'add_field',
    'permission_callback' => function() {
      return current_user_can(  'publish_posts' );
    }
  ));
  register_rest_route( 'wp-table/v1', '/get-fields', array(
    'methods' => 'GET',
    'callback' => 'get_fields',
    'permission_callback' => function() {
      return current_user_can(  'publish_posts' );
    }
  ));
  register_rest_route( 'wp-table/v1', '/delete-field', array(
    'methods' => 'POST',
    'callback' => 'delete_field',
    'permission_callback' => function() {
      return current_user_can(  'publish_posts' );
    }
  ));
  register_rest_route( 'wp-table/v1', '/get-records', array(
    'methods' => 'GET',
    'callback' => 'get_records',
    'permission_callback' => function() {
      return current_user_can(  'publish_posts' );
    }
  ));
  register_rest_route( 'wp-table/v1', '/add-record', array(
    'methods' => 'POST',
    'callback' => 'add_record',
    'permission_callback' => function() {
      return current_user_can(  'publish_posts' );
    }
  ));
});
