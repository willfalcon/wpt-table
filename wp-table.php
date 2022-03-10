<?php
/*
  Plugin Name: WP Table
  Description: Airtable-like table plugin.
  Version: 0.1.0
  Author: Will Hawks
*/

include_once( 'post-type.php' );
include_once( 'inc/debugging.php' );
include_once( 'inc/db.php' );

add_action( 'add_meta_boxes', 'wpt_remove_publish_metabox' );
function wpt_remove_publish_metabox() {
  add_meta_box('wpt-table-box', 'WPT Table', 'wpt_table_box_callback', 'wpt-table', 'normal', 'high');

  function wpt_table_box_callback() {
    echo '';
  }
}

function wpt_enqueue_post_editor_assets() {
  $ver = get_plugin_data( plugin_dir_path( __FILE__ ) . 'wp-table.php' )['Version'];
  if (wpt_get_current_post_type() == 'wpt-table') {
    wp_enqueue_script( 'wp-table-js', plugin_dir_url( __FILE__)  . 'dist/index.js', array( 'wp-api' ), $ver, true );
    wp_enqueue_style( 'wp-table-style', plugin_dir_url( __FILE__)  . 'wpt-style.css', array(), $ver);
  }
  
  wp_enqueue_style( 'wp-table-style', plugin_dir_url( __FILE__)  . 'wpt-global.css', array(), $ver);
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
  register_rest_route( 'wp-table/v1', '/save-field', array(
    'methods' => 'POST',
    'callback' => 'save_field',
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
  register_rest_route( 'wp-table/v1', '/delete-record', array(
    'methods' => 'POST',
    'callback' => 'delete_record',
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


include( 'wpt-table-block.php' );
function wpt_register_server_blocks() {
  register_block_type('wpt/table', array(
    'render_callback' => 'wpt_table_block'
  ));
}

add_action('init', 'wpt_register_server_blocks');


function wpt_enqueue_block_editor_assets() {
  $ver = get_plugin_data( plugin_dir_path( __FILE__ ) . 'wp-table.php' )['Version'];
  wp_enqueue_script( 'wpt_blocks', plugin_dir_url( __FILE__)  . 'dist/blocks/blocks.js', array('wp-blocks', 'wp-element', 'wp-editor'), $ver );
}
add_action( 'enqueue_block_editor_assets', 'wpt_enqueue_block_editor_assets' );


function get_table($table_id) {
  $fields = get_complete_meta($table_id, 'wpt_field_name');
  $record_ids = get_post_meta($table_id, 'wpt_record');
  
  
  $records = array();

  foreach ($record_ids as $record_id) {
    $record_fields = array();
    foreach($fields as $field) {
      $record_field = array(
        'field_label' => $field->meta_value,
        'field_value' => get_post_meta($table_id, 'wpt_' . $record_id . '_' . $field->meta_id)[0]
      );
      array_push($record_fields, $record_field);
    }
    $record_arr = array(
      'id' => $record_id,
      'fields' => $record_fields
    );
    array_push($records, $record_fields);
  }

  $table = array(
    'fields' => $fields,
    'records' => $records
  );

  return $table;
}