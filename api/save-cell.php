<?php

function save_cell($request) {
  $params = $request->get_params();

  $metaKey = $params['metaKey'];
  $postId = $params['postId'];
  $value = $params['value'];

  if ( ! add_post_meta( $postId, $metaKey, $value, true ) ) { 
    update_post_meta ( $postId, $metaKey,$value );
 }

  return $params;
}


function save_heading($request) {
  $params = $request->get_params();

  $metaID = $params['metaID'];
  $postId = $params['postId'];
  $value = $params['value'];

  update_metadata_by_mid( 'post', $metaID, $value );

  return $params;
}

function add_field($request) {
  $params = $request->get_params();
  $postId = $params['postId'];

  $field = add_post_meta( $postId, 'wpt_field_name', '');
 
  return $field;
}

function delete_field($request) {
  $params = $request->get_params();
  $postId = $params['postId'];
  $metaId = $params['metaID'];
  $value = $params['value'];

  $field = delete_post_meta( $postId, 'wpt_field_name', $value);
 
  return $field;
}

function add_record($request) {
  $params = $request->get_params();
  $postId = $params['postId'];

  $record = add_post_meta( $postId, 'wpt_record', '');
  write_log($record);
  return $record;
}

function get_fields($request) {
  $params = $request->get_params();
  $postId = $params['postId'];

  $fields = get_complete_meta($postId, 'wpt_field_name' );
  
  return $fields;
}

function get_records($request) {
  $params = $request->get_params();
  global $postId;
  $postId = $params['postId'];
  global $fields;
  $fields = $params['fields'];
  
  global $records;
  $records = get_complete_meta($postId, 'wpt_record' );
  
  $records = array_map(function($record) {
    global $fields;
    global $local_record;
    $local_record = $record->meta_id;
    return array(
      'id' => $local_record,
      'fields' => array_map(function($field) {
        global $local_record;
        
        global $postId;
        
        $key = 'wpt_' . $local_record . '_' . $field['meta_id'];
        return $record_field = array(
          'key' => $key,
          'value' => get_post_meta($postId, $key)
        );
      }, $fields)
    );
  }, $records);

  return $records;
}

function get_complete_meta( $post_id, $meta_key ) {
  global $wpdb;
  $mid = $wpdb->get_results( $wpdb->prepare("SELECT * FROM $wpdb->postmeta WHERE post_id = %d AND meta_key = %s", $post_id, $meta_key) );
  if( $mid != '' )
    return $mid;

  return false;
}