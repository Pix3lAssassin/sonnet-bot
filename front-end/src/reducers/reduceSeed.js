import Redux from 'redux';

var reduceSeed = (state = '', action) => {
  switch (action.type) {
  case 'CHANGE_SONNET':
    return action.seed;
  default:
    return state;
  }
};

export default reduceSeed;
