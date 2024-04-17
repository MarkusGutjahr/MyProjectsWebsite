/*
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        loadingTask.promise.then((pdf) => {
            setNumPages(pdf.numPages);
        }).catch(error => {
            console.error('Error loading PDF:', error);
            setNumPages(0); // Set numPages to 0 or handle the error as needed
        });
    }, [pdfUrl]);

    if (numPages === null) return <div>Loading...</div>;
    if (numPages === 0) return <div>Error loading PDF</div>;

    return (
        <Document file={pdfUrl}>
            {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
        </Document>
    );
};

export default PDFViewer;


 */