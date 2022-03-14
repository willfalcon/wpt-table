import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime';
import App from './App';

wp.domReady(() => {
  initData();
});

const sideSortables = document.querySelector('#side-sortables');
sideSortables.parentNode.removeChild(sideSortables);
const appWrapper = document.querySelector('#wpt-table-box .inside');

const postId = document.getElementById('post_ID').value;

async function initData() {
  const fields = await wp.apiRequest({
    path: '/wp-table/v1/get-fields',
    data: {
      postId,
    },
  });
  const records = await wp.apiRequest({
    path: '/wp-table/v1/get-records',
    data: {
      postId,
      fields,
    },
  });
  ReactDOM.render(<App postId={parseInt(postId)} fields={fields} records={records} />, appWrapper);
}
