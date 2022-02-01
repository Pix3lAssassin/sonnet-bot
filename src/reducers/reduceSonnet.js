import Redux from 'redux';

var reduceSonnet = (state = '', action) => {
  switch (action.type) {
  case 'CHANGE_SONNET':
    return action.sonnet;
  default:
    return state;
  }
};

export default reduceSonnet;
