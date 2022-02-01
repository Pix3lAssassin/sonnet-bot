import { connect } from 'react-redux';
import Sonnet from '../components/Sonnet.js';

const mapStateToProps = (state) => {
  return {
    sonnet: state.sonnet
  };
};

export default connect(mapStateToProps)(Sonnet);
