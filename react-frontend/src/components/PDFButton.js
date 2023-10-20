// components/PDFButton.js
import React from 'react';

const PDFButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Get PDF</button>
    </div>
  );
};

export default PDFButton;
