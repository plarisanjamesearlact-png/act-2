import React from 'react';
import { Download, Trash2, Maximize2, FileImage } from 'lucide-react';
import { UploadedImage, ViewMode } from '../types';
import { formatBytes, formatDate, downloadImage } from '../utils/fileHelpers';

interface ImageCardProps {
  image: UploadedImage;
  viewMode: ViewMode;
  onSelect: (image: UploadedImage) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  viewMode,
  onSelect,
  onDelete,
}) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadImage(image.dataUrl, image.name);
  };

  if (viewMode === 'list') {
    return (
      <div
        id={`image-row-${image.id}`}
        onClick={() => onSelect(image)}
        className="group flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
            <img
              src={image.dataUrl}
              alt={image.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate" title={image.name}>
              {image.name}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-slate-500">
              <span className="font-medium text-slate-600">{formatBytes(image.size)}</span>
              {image.dimensions.width > 0 && (
                <span>• {image.dimensions.width}×{image.dimensions.height}</span>
              )}
              <span>• {formatDate(image.uploadedAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleDownload}
            className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
            title="Download image"
            aria-label="Download"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => onDelete(image.id, e)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            title="Delete image"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`image-card-${image.id}`}
      onClick={() => onSelect(image)}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-400 transition-all cursor-pointer"
    >
      {/* Thumbnail Aspect Box */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={image.dataUrl}
          alt={image.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay with zoom hint */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="rounded-full bg-white/90 p-2 text-slate-800 shadow-lg backdrop-blur-sm">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>

        {/* Dimension Badge */}
        {image.dimensions.width > 0 && (
          <div className="absolute top-2 left-2 rounded-lg bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            {image.dimensions.width}×{image.dimensions.height}
          </div>
        )}

        {/* Quick action buttons on top right */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleDownload}
            className="rounded-lg bg-white/90 p-1.5 text-slate-700 shadow-md backdrop-blur-sm hover:bg-emerald-600 hover:text-white transition"
            title="Download image"
            aria-label="Download"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => onDelete(image.id, e)}
            className="rounded-lg bg-white/90 p-1.5 text-slate-700 shadow-md backdrop-blur-sm hover:bg-rose-600 hover:text-white transition"
            title="Delete image"
            aria-label="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-3">
        <p className="text-xs font-semibold text-slate-800 truncate" title={image.name}>
          {image.name}
        </p>
        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
          <span>{formatBytes(image.size)}</span>
          <span>{formatDate(image.uploadedAt)}</span>
        </div>
      </div>
    </div>
  );
};
