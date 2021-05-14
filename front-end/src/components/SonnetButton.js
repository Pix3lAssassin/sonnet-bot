import React from 'react';


var SonnetButton = ({handleSonnetButton}) => {
  return (
    <div className="btn-container">
      <button className="btn btn-inline hidden-sm-down" onClick={() => handleSonnetButton()}>
        <span className="sonnet-text">New Sonnet</span><span className="fas fa-sync-alt"></span>
      </button>
    </div>
  );
};

export default SonnetButton;
