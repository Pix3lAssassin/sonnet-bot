import Redux from 'redux';
import getSonnet from '../lib/generateSonnet.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


var reduceSonnet = (state = '', action) => {
  switch (action.type) {
  case 'CHANGE_SONNET':
    return action.sonnet;
  case 'NEW_SONNET':
    const sonnetObj = getSonnet();
    const returnSonnet = async () => {
      const { sonnet } = await sonnetObj;
      return sonnet;
    };
    return returnSonnet();
  default:
    return state;
  }
};

export default reduceSonnet;
