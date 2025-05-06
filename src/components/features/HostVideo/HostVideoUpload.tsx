import React, { useState } from 'react';
import { Upload, X, Check, AlertTriangle } from 'lucide-react';

interface HostVideoUploadProps {
  onUploadComplete: (url: string) => void;
}

const HostVideoUpload: React.FC<HostVideoUploadProps> = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    validateAndSetFile(selectedFile);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    validateAndSetFile(droppedFile);
  };

  // Validate file type and size
  const validateAndSetFile = (file?: File) => {
    setError(null);
    
    if (!file) {
      setError("No file selected");
      return;
    }
    
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      setError("Please select a video file");
      return;
    }
    
    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError("Video must be less than 50MB");
      return;
    }
    
    setFile(file);
  };

  // Handle upload
  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            // Mock successful upload with a fake URL
            onUploadComplete('https://example.com/videos/mock-upload.mp4');
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  // Reset the upload
  const handleReset = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setError(null);
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Upload Host Introduction Video</h2>
      <p className="text-sm text-gray-600 mb-4">
        Share a 30-60 second video introducing yourself and your space to build trust with guests
      </p>
      
      {!file && !isUploading ? (
        // Upload area
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('video-upload')?.click()}
        >
          <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
          <p className="text-sm font-medium text-gray-700">
            Drag and drop your video here or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-1">
            MP4, MOV or WebM • Maximum 50MB • 30-60 seconds
          </p>
          <input 
            type="file" 
            id="video-upload" 
            accept="video/*"
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>
      ) : (
        // File selected or uploading
        <div className="border rounded-lg p-4">
          {file && (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">.{file.name.split('.').pop()}</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {!isUploading && (
                <button 
                  onClick={handleReset}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              )}
            </div>
          )}
          
          {/* Progress bar */}
          {isUploading && (
            <div className="mb-3">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
              </p>
            </div>
          )}
          
          {/* Upload button */}
          {file && !isUploading && (
            <button
              onClick={handleUpload}
              className="w-full py-2 mt-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm flex items-center justify-center"
            >
              <Upload size={16} className="mr-1.5" />
              Upload Video
            </button>
          )}
          
          {/* Upload complete */}
          {uploadProgress === 100 && !isUploading && (
            <div className="flex items-center text-green-600 my-2">
              <Check size={16} className="mr-1.5" />
              <span className="text-sm">Upload successful!</span>
            </div>
          )}
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="mt-2 text-red-600 text-sm flex items-center">
          <AlertTriangle size={16} className="mr-1.5" />
          {error}
        </div>
      )}
      
      {/* AI Enhancement notice */}
      <div className="mt-4 bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-700 font-medium">What happens after upload?</p>
        <ul className="text-xs text-gray-600 mt-1 space-y-1 list-disc pl-4">
          <li>AI-generated captions for better accessibility</li>
          <li>Highlight keywords like "clean", "safe", "family-friendly"</li>
          <li>Auto-generate host traits badges</li>
          <li>Make your listing eligible for "Try with Confidence"</li>
        </ul>
      </div>
    </div>
  );
};

export default HostVideoUpload;