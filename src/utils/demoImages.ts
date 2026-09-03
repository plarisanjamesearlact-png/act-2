import { UploadedImage } from '../types';

export function generateDemoImages(): UploadedImage[] {
  const sampleSvgs = [
    {
      name: 'sunset_horizon.svg',
      width: 1200,
      height: 800,
      size: 45200,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fdba74" />
            <stop offset="50%" stop-color="#f43f5e" />
            <stop offset="100%" stop-color="#4c0519" />
          </linearGradient>
          <radialGradient id="sun" cx="50%" cy="45%" r="35%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="100%" stop-color="#f97316" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#sky)" />
        <circle cx="600" cy="420" r="140" fill="#fef08a" />
        <circle cx="600" cy="420" r="220" fill="url(#sun)" />
        <path d="M0 560 Q300 480 600 550 T1200 520 L1200 800 L0 800 Z" fill="#1e1b4b" opacity="0.9" />
        <path d="M0 640 Q400 590 800 660 T1200 620 L1200 800 L0 800 Z" fill="#0f172a" />
      </svg>`,
    },
    {
      name: 'mountain_lake.svg',
      width: 1080,
      height: 1080,
      size: 38400,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
        <defs>
          <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#e0f2fe" />
          </linearGradient>
          <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#075985" />
          </linearGradient>
        </defs>
        <rect width="1080" height="1080" fill="url(#sky2)" />
        <polygon points="120,680 480,240 840,680" fill="#475569" />
        <polygon points="420,310 480,240 540,310 480,330" fill="#ffffff" />
        <polygon points="460,700 780,320 1020,700" fill="#334155" />
        <polygon points="730,380 780,320 830,380 780,400" fill="#ffffff" />
        <rect y="680" width="1080" height="400" fill="url(#lake)" />
        <ellipse cx="540" cy="850" rx="360" ry="8" fill="#38bdf8" opacity="0.6" />
      </svg>`,
    },
    {
      name: 'emerald_forest.svg',
      width: 800,
      height: 1200,
      size: 41800,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="800" height="1200">
        <defs>
          <linearGradient id="forest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#064e3b" />
            <stop offset="100%" stop-color="#022c22" />
          </linearGradient>
        </defs>
        <rect width="800" height="1200" fill="url(#forest)" />
        <circle cx="400" cy="250" r="180" fill="#10b981" opacity="0.25" />
        <circle cx="400" cy="250" r="90" fill="#34d399" opacity="0.35" />
        <polygon points="400,200 240,600 560,600" fill="#047857" />
        <polygon points="400,450 180,950 620,950" fill="#065f46" />
        <rect x="375" y="950" width="50" height="160" fill="#78350f" />
      </svg>`,
    },
  ];

  const now = Date.now();
  return sampleSvgs.map((s, idx) => ({
    id: `demo_${now}_${idx}`,
    name: s.name,
    dataUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(s.svg)}`,
    size: s.size,
    type: 'image/svg+xml',
    dimensions: {
      width: s.width,
      height: s.height,
    },
    uploadedAt: now - (idx + 1) * 60000,
  }));
}
