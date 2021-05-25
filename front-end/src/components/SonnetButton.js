import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

var SonnetButton = ({seed, handleSonnetButton}) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => setText(e.target.value);

  return (
    <div className="btn-container">
      <span>Seed:</span>
      <input type="text" className="seed-form" value={text} onChange={handleChange} />
      <button className="btn btn-inline hidden-sm-down" onClick={() => handleSonnetButton(text)}>
        <span className="sonnet-text">Generate Sonnet</span><span className="fas fa-sync-alt"></span>
      </button>
      <span className="current-seed">Current Seed: {seed}</span>
    </div>
  );
};


export default SonnetButton;
