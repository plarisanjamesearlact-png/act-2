import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  Smartphone,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { UploadZone } from './components/UploadZone';
import { ImageCard } from './components/ImageCard';
import { ImageModal } from './components/ImageModal';
import { ApkGuideModal } from './components/ApkGuideModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { UploadedImage, SortOption, ViewMode } from './types';
import {
  getStoredImages,
  storeImages,
  removeStoredImage,
  clearAllStoredImages,
} from './utils/storage';
import { generateDemoImages } from './utils/demoImages';

export default function App() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [isApkGuideOpen, setIsApkGuideOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Load stored images from IndexedDB on initial mount
  useEffect(() => {
    getStoredImages().then((stored) => {
      if (stored && stored.length > 0) {
        setImages(stored);
      }
    });
  }, []);

  const handleImagesUploaded = async (newImages: UploadedImage[]) => {
    const updated = [...newImages, ...images];
    setImages(updated);
    await storeImages(newImages);
    showToast(`Uploaded ${newImages.length} image${newImages.length === 1 ? '' : 's'} successfully`);
  };

  const handleDeleteImage = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = images.filter((img) => img.id !== id);
    setImages(updated);
    await removeStoredImage(id);
    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
    showToast('Image removed');
  };

  const handleClearAll = async () => {
    if (images.length === 0) return;
    if (window.confirm(`Delete all ${images.length} uploaded images from this device?`)) {
      setImages([]);
      await clearAllStoredImages();
      showToast('All images cleared');
    }
  };

  const handleAddDemoImages = async () => {
    const demos = generateDemoImages();
    await handleImagesUploaded(demos);
  };

  // Filter & Sort
  const filteredAndSortedImages = useMemo(() => {
    let result = [...images];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((img) => img.name.toLowerCase().includes(q));
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return b.uploadedAt - a.uploadedAt;
        case 'oldest':
          return a.uploadedAt - b.uploadedAt;
        case 'size-desc':
          return b.size - a.size;
        case 'size-asc':
          return a.size - b.size;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          return b.uploadedAt - a.uploadedAt;
      }
    });

    return result;
  }, [images, searchQuery, sortOption]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        imageCount={images.length}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode((m) => (m === 'grid' ? 'list' : 'grid'))}
        onClearAll={handleClearAll}
        onOpenApkGuide={() => setIsApkGuideOpen(true)}
      />

      {/* Main Responsive Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Android APK Callout Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <Smartphone className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Android Ready & APK Export</p>
              <p className="text-xs text-emerald-100/80">
                You can install this directly on Android or package it into an APK in 2 minutes.
              </p>
            </div>
          </div>
          <button
            id="view-apk-guide-banner-btn"
            onClick={() => setIsApkGuideOpen(true)}
            className="self-end sm:self-auto shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-emerald-900 text-xs font-bold shadow-sm hover:bg-emerald-50 active:scale-95 transition"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
            <span>How to make APK</span>
          </button>
        </div>

        {/* Upload Zone */}
        <section aria-label="Upload Images">
          <UploadZone
            onImagesUploaded={handleImagesUploaded}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            onAddDemoImages={handleAddDemoImages}
          />
        </section>

        {/* Search, Filter & Gallery Section */}
        <section aria-label="Gallery Controls" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Uploaded Images
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">
                {images.length}
              </span>
            </div>

            {images.length > 0 && (
              <div className="flex items-center gap-2">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    id="search-images-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative shrink-0">
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
                    <ArrowUpDown className="h-3 w-3 text-slate-500" />
                    <select
                      id="sort-select"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as SortOption)}
                      className="bg-transparent border-none text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="size-desc">Largest size</option>
                      <option value="size-asc">Smallest size</option>
                      <option value="name-asc">Name (A-Z)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gallery Items or Empty State */}
          {images.length === 0 ? (
            <div className="p-10 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-sm">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <ImageIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Your gallery is empty</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Upload photos using the zone above, take a picture from your camera, or try sample photos.
                </p>
              </div>
              <button
                id="empty-state-demo-btn"
                onClick={handleAddDemoImages}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample Images</span>
              </button>
            </div>
          ) : filteredAndSortedImages.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500">
              No images matched &quot;{searchQuery}&quot;. Try a different search.
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
              {filteredAndSortedImages.map((img) => (
                <ImageCard
                  key={img.id}
                  image={img}
                  viewMode="grid"
                  onSelect={(img) => setSelectedImage(img)}
                  onDelete={(id, e) => handleDeleteImage(id, e)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAndSortedImages.map((img) => (
                <ImageCard
                  key={img.id}
                  image={img}
                  viewMode="list"
                  onSelect={(img) => setSelectedImage(img)}
                  onDelete={(id, e) => handleDeleteImage(id, e)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Lightbox Modal */}
      <ImageModal
        image={selectedImage}
        images={filteredAndSortedImages}
        onClose={() => setSelectedImage(null)}
        onDelete={(id) => handleDeleteImage(id)}
        onNavigate={(img) => setSelectedImage(img)}
      />

      {/* APK Step-by-Step Guide Modal */}
      <ApkGuideModal
        isOpen={isApkGuideOpen}
        onClose={() => setIsApkGuideOpen(false)}
      />

      {/* Offline Status Badge */}
      <OfflineIndicator />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-xl animate-fade-in border border-slate-700"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
