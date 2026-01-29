# Firebase Setup Guide for Modanify

This guide will walk you through setting up Firebase for the Modanify application.

## Prerequisites

- A Google account
- Access to [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: **Modanify** (or your preferred name)
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"
6. Wait for the project to be created, then click "Continue"

## Step 2: Add a Web App

1. In your Firebase project dashboard, click the **web icon** (`</>`) to add a web app
2. Register your app:
   - App nickname: **Modanify Web**
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"
3. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

4. Keep this information handy for the next step
5. Click "Continue to console"

## Step 3: Enable Google Authentication

1. In the Firebase Console, go to **Authentication** (from the left sidebar)
2. Click "Get started" if this is your first time
3. Go to the **Sign-in method** tab
4. Click on **Google** in the providers list
5. Toggle the **Enable** switch
6. Enter a support email (your email address)
7. Click **Save**

## Step 4: Get Google Web Client ID

1. While still in the Google sign-in method settings, scroll down to **Web SDK configuration**
2. Copy the **Web client ID** (it looks like: `123456789-abc...apps.googleusercontent.com`)
3. This will be your `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`

## Step 5: Set Up Firestore Database

1. In the Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose a location for your database (select the one closest to your users)
4. Start in **test mode** for development (you can change this later)
5. Click "Enable"

### Firestore Security Rules (For Production)

Once you're ready to deploy, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write only their own register entries
    match /registers/{registerId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Step 6: Configure Your App

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Copy the contents from `.env.example`
3. Fill in your Firebase configuration values:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_from_firebase_config
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google OAuth Configuration
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
```

## Step 7: Test Your Configuration

1. Run your app:
   ```bash
   npm start
   ```

2. Try signing in with Google
3. Check the Firebase Console:
   - Go to **Authentication** > **Users** to see if your user was created
   - Go to **Firestore Database** to see if entries are being saved

## Optional: Set Up Android App

For native Android builds:

1. In Firebase Console, click "Add app" and choose Android
2. Enter your Android package name: `com.modanify.app`
3. Download `google-services.json`
4. Place it in the `android/app/` directory

## Optional: Set Up iOS App

For iOS builds (requires macOS):

1. In Firebase Console, click "Add app" and choose iOS
2. Enter your iOS bundle ID: `com.modanify.app`
3. Download `GoogleService-Info.plist`
4. Place it in the `ios/` directory

## Troubleshooting

### Google Sign-in Not Working

**Problem:** "Error signing in with Google"

**Solutions:**
1. Verify that the `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` is the **Web client ID** from Firebase Console > Authentication > Sign-in method > Google > Web SDK configuration
2. Ensure Google Sign-in is enabled in Firebase Console
3. Check that you're using the correct Firebase project

### Firestore Permission Denied

**Problem:** "Missing or insufficient permissions"

**Solutions:**
1. Check your Firestore security rules
2. Ensure the user is authenticated before accessing Firestore
3. Verify that the `userId` field in your documents matches the authenticated user's UID

### App Crashes on Startup

**Problem:** App crashes immediately after launch

**Solutions:**
1. Clear Expo cache: `expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check that all environment variables are set correctly
4. Verify Firebase configuration is correct

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Expo Firebase Guide](https://docs.expo.dev/guides/using-firebase/)
- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/)
- [React Navigation Documentation](https://reactnavigation.org/)

## Support

If you encounter any issues not covered in this guide, please:
1. Check the [Firebase Console](https://console.firebase.google.com/) for any errors
2. Review the app logs for error messages
3. Open an issue on the GitHub repository
