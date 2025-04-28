//EVERYTHING IS WORKING!!!
import React from 'react';
interface ControlPanelProps {
  onHint: () => void;
  onReset: () => void;
  onNewGame: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onHint, onReset, onNewGame }) => {
  return (
    <div style={{ marginTop: '15px' }}>
      <button onClick={onHint}>Get a Hint</button>
      <button onClick={onReset} style={{ marginLeft: '10px' }}>Reset Board</button>
      <button onClick={onNewGame} style={{ marginLeft: '10px' }}>New Game</button>
    </div>
  );
};

export default ControlPanel;
