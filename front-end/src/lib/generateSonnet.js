var url = '127.0.0.1:3000';

var getSonnet = () => {
  return fetch(url + '/sonnet')
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }

      // Examine the text in the response
      response.text()
        .then(text => text)
        .catch(err => console.log(err));
    });
};

export default generateSonnet;