// components/PDFButton.js
import React from 'react';

const PDFButton = ({ onClick }) => {
  const downloadPDF = async () => {
    try {
      const pdfUrl = 'http://127.0.0.1:5000/get-pdf/sample';

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
    <div>
      <button onClick={onClick}>Get PDF</button>
    </div>
  );
};

export default PDFButton;
