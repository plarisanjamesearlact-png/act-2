import React from 'react';
import { Smartphone, Download, Trash2, LayoutGrid, List, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { ViewMode } from '../types';

interface NavbarProps {
  imageCount: number;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onClearAll: () => void;
  onOpenApkGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  imageCount,
  viewMode,
  onToggleViewMode,
  onClearAll,
  onOpenApkGuide,
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none">
                Simple Image Uploader
              </h1>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Android Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {imageCount === 0 ? 'No images uploaded' : `${imageCount} image${imageCount === 1 ? '' : 's'} stored`}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* APK Guide Button */}
          <button
            id="open-apk-guide-header-btn"
            onClick={onOpenApkGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition active:scale-95"
            title="How to build this into an APK"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xs:inline">Build APK</span>
            <span className="xs:hidden">APK</span>
          </button>

          {/* In-app PWA install button if installable */}
          {isInstallable && !isInstalled && (
            <button
              id="install-pwa-header-btn"
              onClick={install}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-sm active:scale-95 animate-pulse"
              title="Install app to your device"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          )}

          {/* View mode toggle */}
          {imageCount > 0 && (
            <button
              id="toggle-view-mode-btn"
              onClick={onToggleViewMode}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition active:scale-95"
              title={viewMode === 'grid' ? 'Switch to List view' : 'Switch to Grid view'}
              aria-label="Toggle view mode"
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
            </button>
          )}

          {/* Clear All button */}
          {imageCount > 0 && (
            <button
              id="clear-all-images-header-btn"
              onClick={onClearAll}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition active:scale-95"
              title="Clear all stored images"
              aria-label="Clear all images"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
