import Redux from 'redux';
import generateSonnet from '../lib/generateSonnet.js';

var reduceSonnet = (state = '', action) => {
  //TODO: define a reducer for the sonnet field of our state.
  switch (action.type) {
  case 'CHANGE_SONNET':
    return action.sonnet;
  case 'NEW_SONNET':
    return generateSonnet();
  default:
    return state;
  }
};

export default reduceSonnet;
