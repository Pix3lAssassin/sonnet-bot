import React from 'react';
import Sonnet from './Sonnet.js';
import SonnetButton from './SonnetButton.js';

var App = () => {
  return (
    <div>
      <div className="navbar"></div>
      <div className="row">
        <div className="col-md-8">
          <SonnetButton />
          <Sonnet />
        </div>
      </div>
    </div>
  );
};

export default App;
