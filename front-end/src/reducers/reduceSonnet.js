import Redux from 'redux';
import getSonnet from '../lib/generateSonnet.js';

var reduceSonnet = (state = '', action) => {
  switch (action.type) {
  case 'CHANGE_SONNET':
    return action.sonnet;
  case 'NEW_SONNET':
    return getSonnet();
  default:
    return state;
  }
};

export default reduceSonnet;
