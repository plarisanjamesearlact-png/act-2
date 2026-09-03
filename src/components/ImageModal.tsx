import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  HardDrive,
  Maximize,
} from 'lucide-react';
import { UploadedImage } from '../types';
import { formatBytes, formatDate, downloadImage } from '../utils/fileHelpers';

interface ImageModalProps {
  image: UploadedImage | null;
  images: UploadedImage[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onNavigate: (image: UploadedImage) => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  image,
  images,
  onClose,
  onDelete,
  onNavigate,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setZoom(1);
    setRotation(0);
  }, [image?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, images]);

  if (!image) return null;

  const currentIndex = images.findIndex((i) => i.id === image.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const handlePrev = () => {
    if (hasPrev) onNavigate(images[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) onNavigate(images[currentIndex + 1]);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  const aspectRatio =
    image.dimensions.width && image.dimensions.height
      ? (image.dimensions.width / image.dimensions.height).toFixed(2)
      : 'N/A';

  return (
    <div
      id="lightbox-modal-backdrop"
      className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white animate-fade-in"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/10 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <p className="text-sm font-semibold truncate max-w-[200px] sm:max-w-md">{image.name}</p>
          <span className="text-xs text-white/60 shrink-0">
            ({currentIndex + 1} / {images.length})
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
            title="Rotate 90°"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`p-2 rounded-xl transition ${
              showDetails ? 'bg-emerald-600 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="View image details"
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={() => downloadImage(image.dataUrl, image.name)}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
            title="Download full resolution"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm('Delete this image?')) {
                onDelete(image.id);
                onClose();
              }
            }}
            className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition"
            title="Delete image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition ml-1"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-4">
        {/* Navigation Buttons */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Scaled & Rotated Image */}
        <div
          className="transition-transform duration-200 select-none max-w-full max-h-full flex items-center justify-center"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.dataUrl}
            alt={image.name}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Details Drawer / Card (Toggleable) */}
        {showDetails && (
          <div
            className="absolute bottom-6 right-6 z-20 w-80 rounded-2xl bg-slate-900/90 p-4 shadow-2xl backdrop-blur-md border border-white/10 text-xs space-y-2.5 text-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 font-semibold text-white">
              <span>Image Information</span>
              <button
                onClick={() => setShowDetails(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <HardDrive className="w-3.5 h-3.5" /> File Size
              </span>
              <span className="font-mono text-white">{formatBytes(image.size)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Maximize className="w-3.5 h-3.5" /> Resolution
              </span>
              <span className="font-mono text-white">
                {image.dimensions.width} × {image.dimensions.height} ({aspectRatio}:1)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">MIME Type</span>
              <span className="font-mono text-white">{image.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> Uploaded
              </span>
              <span className="text-white">{formatDate(image.uploadedAt)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
