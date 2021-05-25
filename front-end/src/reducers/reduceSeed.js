import Redux from 'redux';

var reduceSeed = (state = '', action) => {
  switch (action.type) {
  case 'CHANGE_SEED':
    return action.seed;
  default:
    return state;
  }
};

export default reduceSeed;
