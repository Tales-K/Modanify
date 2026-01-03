# Quick Start Guide

Get Modanify running in under 10 minutes!

## Prerequisites

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Android Studio (for Android testing) - [Download here](https://developer.android.com/studio)
- A Firebase account (free tier is sufficient)

## Step 1: Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/Tales-K/Modanify.git
cd Modanify

# Install dependencies
npm install
```

## Step 2: Firebase Setup (5 minutes)

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "Modanify" (or any name you prefer)
4. Click through the setup (Google Analytics is optional)

### 2.2 Add Web App

1. Click the web icon (`</>`) in your Firebase project
2. Register app as "Modanify Web"
3. Copy the configuration values

### 2.3 Enable Google Sign-in

1. Go to **Authentication** → **Sign-in method**
2. Enable **Google**
3. Add your support email
4. Copy the **Web client ID** from Web SDK configuration

### 2.4 Enable Firestore

1. Go to **Firestore Database**
2. Click "Create database"
3. Choose a location
4. Start in **test mode**

## Step 3: Configure App (1 minute)

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
```

## Step 4: Run the App (2 minutes)

```bash
# Start the development server
npm start
```

This will open Expo Dev Tools in your browser.

### Option A: Run on Android Emulator

1. Open Android Studio
2. Start an Android Virtual Device (AVD)
3. Press `a` in the terminal or click "Run on Android" in Expo Dev Tools

### Option B: Run on Physical Device

1. Install "Expo Go" app on your Android device
2. Scan the QR code shown in the terminal

### Option C: Run on Web (for testing)

Press `w` in the terminal or click "Run in web browser" in Expo Dev Tools

## Step 5: Test the App

1. **Sign in** with your Google account
2. **Create an entry** using the + button
3. **View your entries** in the list
4. **Edit/Delete** entries using the menu (⋮)
5. **Open drawer** using the menu button (☰)
6. **View profile** from the drawer menu

## Troubleshooting

### Can't sign in with Google?
- Double-check your `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- Ensure it's the Web client ID, not Android/iOS client ID
- Make sure Google sign-in is enabled in Firebase Console

### Firebase connection error?
- Verify all `.env` values are correct
- Check Firebase project is active
- Ensure Firestore database is created

### App won't start?
```bash
# Clear cache and restart
expo start -c
```

### Module not found errors?
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## What's Next?

- Read the full [README.md](README.md) for more details
- Check [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed Firebase configuration
- Review [DEVELOPMENT.md](DEVELOPMENT.md) for development guidelines

## Need Help?

- Check the [Firebase Console](https://console.firebase.google.com/) for errors
- Review app logs for error messages
- Open an issue on GitHub

---

**Congratulations! 🎉** You're now running Modanify. Start tracking your activities, health, and habits!
