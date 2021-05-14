import { combineReducers } from 'redux';
import reduceSonnet from './reduceSonnet.js';

var rootReducer = combineReducers({
  sonnet: reduceSonnet
});

export default rootReducer;
