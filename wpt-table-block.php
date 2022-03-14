<?php 


function wpt_table_block($attributes) { 

  $table = get_table($attributes['table']);
  

  $thead = '';

  $thead .= '<tr>';
  foreach($table['fields'] as $field) {
    $thead .= '<th>' . $field->meta_value . '</th>';
  }
  $thead .= '</tr>';

  $trows = '';
  
  foreach($table['records'] as $record) {
    $trow = '';
    $trow .= '<tr>';
    foreach($record['fields'] as $cell) {
      $trow .= '<td>' . $cell['field_value'] . '</td>';
    }
    $trow .= '</tr>';
    if ($record['subheading']) {
      $thead .= $trow;
    } else {
      $trows .= $trow;
    }
  }

  return '<div class="wpt-table-container">
    <h1>Table</h1>
    <table class="wpt-table">
      <thead>
        ' . $thead . '
      </thead>
      <tbody>
        ' . $trows . '
      </tbody>
    </table>
  </div>';
}
