import React from 'react';
import SonnetContainer from '../containers/SonnetContainer.js';
import SonnetButtonContainer from '../containers/SonnetButtonContainer.js';

var App = () => {
  return (
    <div>
      <div className="banner"></div>
      <div className="container">
        <SonnetButtonContainer />
        <SonnetContainer />
      </div>
    </div>
  );
};

export default App;
