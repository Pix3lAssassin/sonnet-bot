import getSonnet from '../lib/generateSonnet.js';
import changeSeed from './changeSeed.js';

export var changeSonnet = (sonnet) => ({
  //TODO:  Return object with type and string for sonnet
  type: 'CHANGE_SONNET',
  sonnet
});

export var newSonnet = (seed = undefined) => {
  return (dispatch) => {
    getSonnet(seed)
      .then((sonnetObj) => {
        dispatch(changeSonnet(sonnetObj.sonnet));
        dispatch(changeSeed(sonnetObj.seed));
      })
      .catch(err => console.log(err));
  };
};






