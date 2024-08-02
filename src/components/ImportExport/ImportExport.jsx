import React, { useRef } from 'react';
import { FaDownload, FaUpload } from 'react-icons/fa';
import './ImportExport.css';
import * as XLSX from 'xlsx';

const ImportExport = ({ projects, onImport, onExport }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);


      const importedData = json.map((item) => ({
        ...item,
        id: '_' + Math.random().toString(36).substr(2, 9),
      }));

      onImport(importedData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="import-export-container">
      <div className="export-section">
        <button onClick={onExport} className="export-button"><FaUpload /> Export</button>
      </div>
      <div className="import-section">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button onClick={() => fileInputRef.current.click()} className="import-button"><FaDownload /> Import</button>
      </div>
    </div>
  );
};

export default ImportExport;
