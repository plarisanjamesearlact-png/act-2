import React, { useState } from 'react';
import { X, Copy, Check, Smartphone, Terminal, Globe, Download, ExternalLink, HelpCircle } from 'lucide-react';

interface ApkGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl?: string;
}

export const ApkGuideModal: React.FC<ApkGuideModalProps> = ({ isOpen, onClose, appUrl }) => {
  const [activeTab, setActiveTab] = useState<'github_vscode' | 'pwabuilder' | 'webapk'>('github_vscode');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUrl = appUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://your-app-url.run.app');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      id="apk-guide-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="apk-guide-card"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">How to Turn This App into an Android APK</h2>
              <p className="text-xs text-slate-500">GitHub ➔ File Explorer ➔ VS Code ➔ Android Studio Workflow</p>
            </div>
          </div>
          <button
            id="close-apk-guide-btn"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-5 pt-2 gap-2 text-xs font-medium overflow-x-auto">
          <button
            id="tab-github-vscode"
            onClick={() => setActiveTab('github_vscode')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 whitespace-nowrap transition ${
              activeTab === 'github_vscode'
                ? 'border-emerald-600 text-emerald-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>GitHub ➔ VS Code ➔ Studio</span>
          </button>
          <button
            id="tab-pwabuilder"
            onClick={() => setActiveTab('pwabuilder')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 whitespace-nowrap transition ${
              activeTab === 'pwabuilder'
                ? 'border-emerald-600 text-emerald-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>PWABuilder (No Code)</span>
          </button>
          <button
            id="tab-webapk"
            onClick={() => setActiveTab('webapk')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 whitespace-nowrap transition ${
              activeTab === 'webapk'
                ? 'border-emerald-600 text-emerald-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Direct Android WebAPK</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 text-sm text-slate-700 space-y-4">
          {activeTab === 'github_vscode' && (
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
                <Terminal className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Your Exact Pipeline:</strong> Follow these precise steps to take your project from GitHub to File Explorer, open in VS Code, and compile into an APK inside Android Studio!
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Step 1 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">1</span>
                    <span>GITHUB: Push / Clone Repository</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    In AI Studio, use <strong>Settings (top right) ➔ Export to GitHub</strong> (or download the ZIP and push it to your GitHub repository). Then copy your repository URL:
                  </p>
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                      git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
                    </pre>
                    <button
                      onClick={() => copyToClipboard('git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git', 'git-clone')}
                      className="absolute top-2 right-2 p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                    >
                      {copiedId === 'git-clone' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">2</span>
                    <span>FILE EXPLORER: Locate the Project Folder</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Open <strong>Windows File Explorer</strong> (or Mac Finder) and locate your cloned or extracted folder (e.g., in <code className="bg-slate-200 px-1 rounded text-slate-800">C:\Users\YourName\Projects\simple-image-uploader</code>). Verify you see <code className="text-emerald-700">package.json</code> and <code className="text-emerald-700">src/</code>.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">3</span>
                    <span>VS CODE: Open Project & Install Capacitor</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Right-click the folder in File Explorer and click <strong>&quot;Open with Code&quot;</strong> (or open VS Code and go to <strong>File ➔ Open Folder</strong>). Then open the Integrated Terminal (<kbd className="bg-slate-200 px-1 rounded">Ctrl + `</kbd>) and run:
                  </p>
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                      {`# 1. Install project dependencies\nnpm install\n\n# 2. Add Capacitor for Android native support\nnpm install @capacitor/core @capacitor/cli @capacitor/android\n\n# 3. Initialize Capacitor configuration\nnpx cap init "Image Uploader" "com.app.imageuploader" --web-dir dist\n\n# 4. Compile the production web build\nnpm run build\n\n# 5. Generate the Android Studio project folder\nnpx cap add android`}
                    </pre>
                    <button
                      onClick={() => copyToClipboard('npm install && npm install @capacitor/core @capacitor/cli @capacitor/android && npx cap init "Image Uploader" "com.app.imageuploader" --web-dir dist && npm run build && npx cap add android', 'vscode-commands')}
                      className="absolute top-2 right-2 p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                    >
                      {copiedId === 'vscode-commands' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">4</span>
                    <span>LAUNCH TO ANDROID STUDIO</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    In your VS Code terminal, launch the native Android Studio project directly by typing:
                  </p>
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                      npx cap open android
                    </pre>
                    <button
                      onClick={() => copyToClipboard('npx cap open android', 'cap-open')}
                      className="absolute top-2 right-2 p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                    >
                      {copiedId === 'cap-open' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    <em>Or manually: Open Android Studio ➔ Click &quot;Open&quot; ➔ Select the <code className="text-slate-800 font-mono">android</code> subfolder in your project.</em>
                  </p>
                </div>

                {/* Step 5 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">5</span>
                    <span>ANDROID STUDIO: Compile & Build the APK</span>
                  </div>
                  <ol className="space-y-1 text-slate-600 list-decimal pl-4">
                    <li>Wait for Android Studio to finish Gradle sync (bottom status bar).</li>
                    <li>In the top menu, go to: <strong>Build ➔ Build Bundle(s) / APK(s) ➔ Build APK(s)</strong>.</li>
                    <li>Android Studio will compile the APK and show a popup at the bottom right: <em>&quot;Build APK(s): APK(s) generated successfully&quot;</em>.</li>
                    <li>Click the blue <strong>&quot;locate&quot;</strong> link in that popup!</li>
                  </ol>
                  <div className="mt-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-emerald-900 font-mono text-[11px]">
                    Saved at: android/app/build/outputs/apk/debug/app-debug.apk
                  </div>
                  <p className="text-slate-600 mt-1 text-[11px]">
                    Copy <code className="font-semibold text-slate-800">app-debug.apk</code> to your phone (via USB cable, Google Drive, or messaging), tap on it, and install!
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'pwabuilder' && (
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
                <Smartphone className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Recommended for beginners:</strong> PWABuilder is an official Microsoft open-source tool that packages your PWA manifest into a signed Android APK/AAB in under 2 minutes without needing Android Studio or Java installed.
                </div>
              </div>

              <ol className="space-y-3.5 list-none pl-0">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-mono text-xs font-bold text-slate-700">1</span>
                  <div className="space-y-1.5 flex-1">
                    <p className="font-semibold text-slate-800">Copy your public application URL</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={currentUrl}
                        className="w-full font-mono text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 select-all"
                      />
                      <button
                        onClick={() => copyToClipboard(currentUrl, 'url')}
                        className="flex items-center gap-1 shrink-0 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition"
                      >
                        {copiedId === 'url' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === 'url' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-mono text-xs font-bold text-slate-700">2</span>
                  <div className="space-y-1 flex-1">
                    <p className="font-semibold text-slate-800">Go to PWABuilder.com</p>
                    <p className="text-xs text-slate-600">Open <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-emerald-600 underline font-medium inline-flex items-center gap-0.5">pwabuilder.com <ExternalLink className="h-3 w-3" /></a> and paste your URL into the input field, then tap <strong>Start</strong>.</p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-mono text-xs font-bold text-slate-700">3</span>
                  <div className="space-y-1 flex-1">
                    <p className="font-semibold text-slate-800">Select &quot;Android&quot; Package</p>
                    <p className="text-xs text-slate-600">PWABuilder checks the PWA score (Manifest, Service Worker, and 512x512 icons are already pre-configured for 100% pass). Click on <strong>Package for Stores</strong> and choose <strong>Android</strong>.</p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-mono text-xs font-bold text-slate-700">4</span>
                  <div className="space-y-1 flex-1">
                    <p className="font-semibold text-slate-800">Generate and download APK</p>
                    <p className="text-xs text-slate-600">In the Android options, click <strong>Generate APK</strong>. It will build and download your installable <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">.apk</code> file. Transfer it to any Android phone and tap to install!</p>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'webapk' && (
            <div className="space-y-4">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <Smartphone className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Instant Native Experience (No compilation needed!):</strong> On Android, modern Chrome automatically converts this PWA into an official Android <strong>WebAPK</strong> registered in your phone settings and app launcher!
                </div>
              </div>

              <ol className="space-y-3 list-none pl-0">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-mono text-xs font-bold text-slate-700">1</span>
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-800">Open the app URL in Google Chrome on your Android device</p>
                    <p className="text-slate-500">Scan or navigate to your app link on your phone.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-mono text-xs font-bold text-slate-700">2</span>
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-800">Tap the &quot;Install App&quot; button or Chrome Menu (⋮)</p>
                    <p className="text-slate-500">Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-mono text-xs font-bold text-slate-700">3</span>
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-800">Android builds a real APK silently in the background</p>
                    <p className="text-slate-500">The app icon appears in your phone app drawer, opens in standalone immersive window without browser borders, and works offline!</p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <HelpCircle className="h-4 w-4 text-emerald-600" />
            <span>Ready-to-package Android PWA Manifest included</span>
          </div>
          <button
            id="apk-guide-got-it-btn"
            onClick={onClose}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
