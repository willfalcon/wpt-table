<?php 
function cptui_register_my_cpts_wpt_table() {

/**
 * Post Type: Tables.
 */

$labels = [
  "name" => __( "Tables", "cdhq" ),
  "singular_name" => __( "Table", "cdhq" ),
];

$args = [
  "label" => __( "Tables", "cdhq" ),
  "labels" => $labels,
  "description" => "",
  "public" => true,
  "publicly_queryable" => true,
  "show_ui" => true,
  "show_in_rest" => true,
  "rest_base" => "",
  "rest_controller_class" => "WP_REST_Posts_Controller",
  "has_archive" => false,
  "show_in_menu" => true,
  "show_in_nav_menus" => true,
  "delete_with_user" => false,
  "exclude_from_search" => false,
  "capability_type" => "post",
  "map_meta_cap" => true,
  "hierarchical" => false,
  "rewrite" => [ "slug" => "wpt-table", "with_front" => true ],
  "query_var" => true,
  "menu_icon" => "dashicons-editor-table",
  "supports" => [ "title" ],
  "show_in_graphql" => false,
];

register_post_type( "wpt-table", $args );
}

add_action( 'init', 'cptui_register_my_cpts_wpt_table' );
