// components/PDFButton.js
import React from 'react';

const PDFButton = ({ pdfUrl, buttonText }) => {
  const handleDownload = () => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'downloaded.pdf';
    link.target = '_blank';

    // Trigger a click event on the anchor element
    link.click();
  };

  return (
    <button onClick={handleDownload}>{buttonText}</button>
  );
};

export default PDFButton;
