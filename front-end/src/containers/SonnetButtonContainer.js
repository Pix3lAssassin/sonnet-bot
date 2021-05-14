import { connect } from 'react-redux';
import SonnetButton from '../components/SonnetButton.js';
import { newSonnet } from '../actions/changeSonnet.js';

const mapDispatchToProps = (dispatch) => {
  return {
    handleSonnetButton: () => dispatch(newSonnet())
  };
};

export default connect(null, mapDispatchToProps)(SonnetButton);
