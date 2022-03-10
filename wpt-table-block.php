<?php 


function wpt_table_block($attributes) { 

  $table = get_table($attributes['table']);
  
  

  $thead = '';

  foreach($table['fields'] as $field) {
    $thead .= '<th>' . $field->meta_value . '</th>';
  }

  $trows = '';
  foreach($table['records'] as $record) {
    $trow = '';
    $trow .= '<tr>';
    foreach($record as $cell) {
      $trow .= '<td>' . $cell['field_value'] . '</td>';
    }
    $trows .= $trow;
  }

  return '<div class="wpt-table-container">
    <h1>Table</h1>
    <table class="wpt-table">
      <thead>
        <tr>
          ' . $thead . '
        </tr>
      </thead>
      <tbody>
        ' . $trows . '
      </tbody>
    </table>
  </div>';
}
