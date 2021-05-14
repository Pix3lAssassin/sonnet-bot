import React from 'react';
import PropTypes from 'prop-types';

var Sonnet = ({sonnet}) => (
  <div className="sonnet-text">
    {sonnet}
  </div>
);

// const newText = text.split('\n').map(str => <p>{str}</p>);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Sonnet.propTypes = {
  sonnet: PropTypes.string.isRequired
};

export default Sonnet;
