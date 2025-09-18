import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { Upload as UploadIcon, Folder, File, X, Info, Loader } from 'react-feather';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { uploading, uploadSuccess, uploadFiles } = useStore();

  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...newFiles]);
  };
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (uploadSuccess) {
      setFiles([]);
    }
  }, [uploadSuccess]);

  const handleUpload = () => {
    if (files.length === 0) return;
    uploadFiles(files);
  };

  return (
    <div data-aos="fade-up" className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Medical Reports</h2>
        <p className="text-gray-600">Upload PDF, JPEG, or PNG files for AI analysis</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <UploadIcon className="text-blue-600" size={24} />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">{isDragging ? 'Drop files here' : 'Drag & drop files here'}</h3>
        <p className="text-gray-500 mb-4">or</p>
        <label className="cursor-pointer">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center">
            <Folder className="mr-2" size={16} /> Select Files
            <input type="file" className="hidden" multiple onChange={handleFileChange} />
          </span>
        </label>
        <p className="text-sm text-gray-500 mt-3">Supports: PDF, JPG, PNG (Max 10MB each)</p>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Files to Upload ({files.length})</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3"><File className="text-blue-600" size={16} /></div>
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center disabled:bg-blue-400"
            >
              {uploading ? (
                <><Loader className="animate-spin mr-2" size={16} /> Uploading...</>
              ) : (
                <><UploadIcon className="mr-2" size={16} /> Upload and Analyze</>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="mt-12 bg-blue-50 p-6 rounded-xl">
        <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center"><Info className="mr-2" size={18} /> How it works</h3>
        <ol className="space-y-4">
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full h-6 w-6 mr-3">1</span>
            <p className="text-gray-700">Upload medical reports in PDF or image format</p>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full h-6 w-6 mr-3">2</span>
            <p className="text-gray-700">Our AI extracts and analyzes all values from your reports</p>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full h-6 w-6 mr-3">3</span>
            <p className="text-gray-700">Receive instant insights on abnormal values and potential risks</p>
          </li>
        </ol>
      </div>
    </div>
  );
}
