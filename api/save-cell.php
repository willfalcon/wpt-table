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


function save_field($request) {
  $params = $request->get_params();

  $metaID = $params['metaID'];
  $postId = $params['postId'];
  $value = $params['value'];
  $type = $params['type'];
  
  update_metadata_by_mid( 'post', $metaID, $value );
  update_post_meta( $postId, 'wpt_field_type_' . $metaID, $type);
  return $params;
}

function add_field($request) {
  $params = $request->get_params();
  $postId = $params['postId'];
  $type = 'text';

  $field = add_post_meta( $postId, 'wpt_field_name', '');
  
  $field_type = add_post_meta($postId, 'wpt_field_type_' . $field, $type);
  return $field;
}

function delete_field($request) {
  $params = $request->get_params();
  $postId = $params['postId'];
  $metaId = $params['metaID'];
  $value = $params['value'];

  $field = delete_post_meta( $postId, 'wpt_field_name', $value);
  $field_type = delete_post_meta( $postId, 'wpt_field_type_' . $metaId);
 
  return $field;
}

function delete_record($request) {
  $params = $request->get_params();
  $postId = $params['postId'];
  $record = $params['record'];

  $field = delete_post_meta( $postId, 'wpt_record', $record);
 
  return $field;
}

function add_record($request) {
  $params = $request->get_params();
  $postId = $params['postId'];

  $record = add_post_meta( $postId, 'wpt_record', '');
  update_metadata_by_mid('post', $record, $record);
  
  return $record;
}

function update_record($request) {
  $params = $request->get_params();
  $postId = $params['postId'];
  $record = $params['record'];
  $record = update_metadata_by_mid('post', $record, 'wpt_sub_heading');
  return $record;
}

function get_fields($request) {
  $params = $request->get_params();
  $postId = $params['postId'];

  $fields = get_complete_meta($postId, 'wpt_field_name' );

  foreach ($fields as $field) {
    $field->type = get_post_meta($postId, 'wpt_field_type_' . $field->meta_id)[0];
  }
  
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
      'subheading' => $record->meta_value == 'wpt_sub_heading',
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
