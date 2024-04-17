import React from 'react';
import '../../pdf.css';

const SERMPage = () => {
    return (
        <div id="pdfdiv">
            <iframe id="pdf" src="/pageFiles/Datenbank/SERM.pdf"></iframe>
        </div>
    );
};

export default SERMPage;

/*
import React from 'react';
import './pdf.css';
import PDFViewer from './PDFViewer';

const SERMPage = () => {
    const pdfUrl = '/pageFiles/Datenbank/SERM.pdf';

    return (
        <div>
            <PDFViewer pdfUrl={pdfUrl} />
        </div>
    );
};

export default SERMPage;

 */