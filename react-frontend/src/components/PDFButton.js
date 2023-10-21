// components/PDFButton.js
import React from 'react';

const PDFButton = ({ pdfUrl, buttonText }) => {
  const downloadPDF = async () => {
    try {
      // Fetch the PDF content from the URL
      const response = await fetch(pdfUrl);
      const pdfData = await response.arrayBuffer();

      // Convert the data to a Blob
      const pdfBlob = blobUtil.arrayBufferToBlob(pdfData, 'application/pdf');

      // Save the Blob as a file with the desired file name
      saveAs(pdfBlob, 'downloaded.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };


  return (
    <button onClick={downloadPDF}>{buttonText}</button>
  );
};

export default PDFButton;
