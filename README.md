# Simple Image Uploader (Android App)

A simple, fast image uploader with camera capture, gallery picker, image lightbox preview, metadata inspector, and full offline support.

---

## 🚀 How to Build into an Android APK

### Step 1: In VS Code (Project Root)
Open your terminal in VS Code (`Ctrl + \``) and run:

```bash
# 1. Install project dependencies
npm install

# 2. Add Capacitor for Android
npm install @capacitor/core @capacitor/cli @capacitor/android

# 3. Initialize Capacitor configuration
npx cap init "Image Uploader" "com.app.imageuploader" --web-dir dist

# 4. Build the web app production bundle
npm run build

# 5. Create the native Android Studio project
npx cap add android

# 6. Open the Android project in Android Studio
npx cap open android
```

---

### Step 2: In Android Studio
1. Wait for **Gradle sync** to finish at the bottom bar.
2. In the top menu, click:
   **Build** ➔ **Build Bundle(s) / APK(s)** ➔ **Build APK(s)**.
3. When it finishes, click the blue **"locate"** popup link in the bottom-right corner.
4. Your APK will be at:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📁 Project Structure
- `src/App.tsx` — Main application UI
- `src/components/UploadZone.tsx` — Camera & gallery picker
- `src/components/ImageCard.tsx` — Image grid and list items
- `src/components/ImageModal.tsx` — Zoom, rotation, and details lightbox
- `src/utils/storage.ts` — IndexedDB local offline storage
