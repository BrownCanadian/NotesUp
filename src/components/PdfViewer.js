import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{
          cMapUrl: "https://unpkg.com/pdfjs-dist@2.6.347/cmaps/",
          cMapPacked: true,
        }}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}

export default PDFViewer;
