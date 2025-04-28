import React from 'react';
import './WinModal.css';

interface WinModalProps {
  onClose: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Congratulations! 🎉</h2>
      <p>You’ve completed the puzzle!</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default WinModal;
