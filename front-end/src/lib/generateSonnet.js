var url = 'http://localhost:3000';

var getSonnet = (seed) => {
  return fetch(url + '/sonnet' + (seed !== undefined ? '/' + encodeURIComponent(String(seed)) : ''))
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return { seed, sonnet: 'Error'};
      }

      // Examine the text in the response
      return response.json();
    })
    .catch(err => console.log(err));
};

export default getSonnet;