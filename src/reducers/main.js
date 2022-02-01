import { combineReducers } from 'redux';
import reduceSonnet from './reduceSonnet.js';
import reduceSeed from './reduceSeed.js';

var rootReducer = combineReducers({
  sonnet: reduceSonnet,
  seed: reduceSeed
});

export default rootReducer;
