import React, { useRef, useState } from 'react';
import { Camera, ImagePlus, UploadCloud, Sparkles, Loader2 } from 'lucide-react';
import { fileToDataUrl, getImageDimensions } from '../utils/fileHelpers';
import { UploadedImage } from '../types';

interface UploadZoneProps {
  onImagesUploaded: (images: UploadedImage[]) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  onAddDemoImages: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onImagesUploaded,
  isProcessing,
  setIsProcessing,
  onAddDemoImages,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    setIsProcessing(true);
    try {
      const newImages: UploadedImage[] = [];

      for (const file of validFiles) {
        const dataUrl = await fileToDataUrl(file);
        const dimensions = await getImageDimensions(dataUrl);

        newImages.push({
          id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          name: file.name,
          dataUrl,
          size: file.size,
          type: file.type || 'image/jpeg',
          dimensions,
          uploadedAt: Date.now(),
        });
      }

      onImagesUploaded(newImages);
    } catch (err) {
      console.error('Error processing images:', err);
    } finally {
      setIsProcessing(false);
      if (galleryInputRef.current) galleryInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full">
      {/* Hidden File Inputs */}
      <input
        ref={galleryInputRef}
        id="gallery-file-input"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />
      {/* Camera Capture Input for Mobile Devices */}
      <input
        ref={cameraInputRef}
        id="camera-file-input"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />

      {/* Main Touch & Drop Surface */}
      <div
        id="upload-drop-zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => galleryInputRef.current?.click()}
        className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-6 sm:p-8 transition-all cursor-pointer select-none text-center ${
          isDragOver
            ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01] shadow-lg shadow-emerald-500/10'
            : 'border-slate-300 bg-white hover:border-emerald-400 hover:bg-slate-50/70 shadow-sm'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          {/* Main Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100/70 text-emerald-600 shadow-inner transition group-hover:scale-105">
            {isProcessing ? (
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            ) : (
              <UploadCloud className="h-8 w-8 text-emerald-600" />
            )}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {isProcessing ? 'Processing Images...' : 'Tap or Drop Images Here'}
            </h2>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Supports JPEG, PNG, WEBP, GIF and Camera photos. Automatically stored safely on your device.
            </p>
          </div>

          {/* Quick Android Action Buttons */}
          <div
            className="mt-2 flex flex-wrap items-center justify-center gap-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery Upload Button */}
            <button
              id="choose-photos-btn"
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              disabled={isProcessing}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition disabled:opacity-50"
            >
              <ImagePlus className="h-4 w-4" />
              <span>Choose from Gallery</span>
            </button>

            {/* Direct Camera Button (Android Camera Intent) */}
            <button
              id="open-camera-btn"
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={isProcessing}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-100 active:scale-95 transition disabled:opacity-50"
            >
              <Camera className="h-4 w-4 text-emerald-600" />
              <span>Take Photo</span>
            </button>

            {/* Quick Demo Photos */}
            <button
              id="add-demo-photos-btn"
              type="button"
              onClick={onAddDemoImages}
              disabled={isProcessing}
              className="flex items-center gap-1.5 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100/60 active:scale-95 transition disabled:opacity-50"
              title="Load high-quality demo samples to preview"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Sample Photos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
