import { connect } from 'react-redux';
import SonnetButton from '../components/SonnetButton.js';
import { newSonnet } from '../actions/changeSonnet.js';

const mapDispatchToProps = (dispatch) => {
  return {
    handleSonnetButton: (seed) => dispatch(newSonnet(seed))
  };
};

const mapStateToProps = (state) => {
  return {
    seed: state.seed
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SonnetButton);
