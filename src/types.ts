export interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  size: number;
  type: string;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedAt: number;
}

export type SortOption = 'newest' | 'oldest' | 'size-desc' | 'size-asc' | 'name-asc';
export type ViewMode = 'grid' | 'list';
