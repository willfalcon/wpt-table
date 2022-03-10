<?php

function get_complete_meta( $post_id, $meta_key ) {
  global $wpdb;
  $mid = $wpdb->get_results( $wpdb->prepare("SELECT * FROM $wpdb->postmeta WHERE post_id = %d AND meta_key = %s", $post_id, $meta_key) );
  if( $mid != '' )
    return $mid;

  return false;
}