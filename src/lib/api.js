function apiCall(endpoint, body) {
  return new Promise(async (resolve, reject) => {
    fetch(`/wp-json/wp-table/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

export default apiCall;
