import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
};

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [localFile, setLocalFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setLocalFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 20 * 1024 * 1024,
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalFile(null);
    onFileSelect?.(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto border-2 border-dashed border-gray-300 rounded-2xl p-6 shadow-md transition hover:shadow-xl">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center text-center cursor-pointer relative"
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-3">
          {localFile ? (
            <div
              className="uploader-selected-file flex items-center justify-between gap-4 w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <img src="/images/pdf.png" alt="pdf" className="size-10" />
                <div className="flex flex-col text-left">
                  <p className="text-sm truncate max-w-xs font-medium text-gray-700">
                    {localFile.name}
                  </p>
                  <p className="text-sm text-gray-500">{formatSize(localFile.size)}</p>
                </div>
              </div>
              <button
                className="p-2 rounded-full cursor-pointer shadow-amber-300 transition hover:shadow-xl"
                onClick={handleRemoveFile}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-red-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-6m0 0l-3 3m3-3l3 3m6 1a4 4 0 00-3.999-4h-.2A5.978 5.978 0 0012 4a5.978 5.978 0 00-5.801 4.218A4.001 4.001 0 004 12a4 4 0 004 4h8a4 4 0 004-4z"
                />
              </svg>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Click or drag to upload PDF</span>
              </p>
              <p className="text-sm text-gray-400">Max file size: 20MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
