import getSonnet from '../lib/generateSonnet.js';

export var changeSonnet = (sonnetObj) => ({
  //TODO:  Return object with type and string for sonnet
  type: 'CHANGE_SONNET',
  sonnet: sonnetObj.sonnet,
  seed: sonnetObj.seed
});

export var newSonnet = () => {
  return (dispatch) => {
    getSonnet()
      .then((sonnetObj) => dispatch(changeSonnet(sonnetObj)))
      .catch(err => console.log(err));
  };
};






