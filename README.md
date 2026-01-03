# Modanify

A React Native mobile application for activity tracking, health monitoring, and habit management. Built with Expo, Firebase, and Material Design (React Native Paper).

## Features

- 🔐 Google Authentication
- 📝 Activity, Health, and Habit Tracking
- 📅 Date-based Entry Management
- 💾 Firebase Firestore for Data Storage
- 🎨 Material Design UI (React Native Paper)
- 📱 Android Support
- 🔄 Real-time Data Synchronization

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- A Firebase project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Tales-K/Modanify.git
cd Modanify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add a Web app to your Firebase project
4. Copy your Firebase configuration
5. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google Sign-in
   - Add your support email
6. Create a Firestore Database:
   - Go to Firestore Database
   - Create database (start in test mode for development)

### 4. Environment Variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update the `.env` file with your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_web_client_id.apps.googleusercontent.com
```

**Note:** The `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` should be your Web Client ID from Firebase Console > Authentication > Sign-in method > Google > Web SDK configuration.

### 5. Update app.json (Optional)

Update the EAS project ID in `app.json` if you plan to build the app:

```json
"extra": {
  "eas": {
    "projectId": "your-eas-project-id"
  }
}
```

## Running the App

### Development Mode

Start the Expo development server:

```bash
npm start
```

### Android

```bash
npm run android
```

**Requirements:**
- Android Studio with Android SDK
- Android device or emulator

### iOS (macOS only)

```bash
npm run ios
```

### Web

```bash
npm run web
```

## Project Structure

```
Modanify/
├── src/
│   ├── components/       # Reusable UI components
│   ├── config/          # Configuration files (Firebase)
│   ├── contexts/        # React contexts (Auth)
│   ├── navigation/      # Navigation setup
│   ├── screens/         # Screen components
│   ├── services/        # Business logic and API calls
│   └── types/           # TypeScript type definitions
├── assets/              # Images, fonts, and other assets
├── App.tsx             # Main app component
├── app.json            # Expo configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript configuration
```

## Main Features

### Authentication
- Google Sign-in integration
- Secure Firebase Authentication
- User profile management

### Entry Register
- Create, read, update, and delete entries
- Three types of entries:
  - **Activity**: Track physical activities
  - **Health**: Monitor health metrics
  - **Habit**: Track daily habits
- Date selection for current or past entries
- Optional value and unit tracking
- Completion status for habits

### Navigation
- Drawer navigation with sidebar menu
- Easy access to:
  - Entry Register (default page)
  - User Profile

## Firestore Database Structure

```
registers/
├── {entryId}/
│   ├── userId: string
│   ├── type: 'activity' | 'health' | 'habit'
│   ├── title: string
│   ├── description: string
│   ├── date: Timestamp
│   ├── value: number (optional)
│   ├── unit: string (optional)
│   ├── completed: boolean (optional)
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp
```

## Building for Production

### Android

1. Configure signing in `eas.json`
2. Build with EAS:

```bash
eas build --platform android
```

Or create a local build:

```bash
npx expo run:android --variant release
```

## Technologies Used

- **React Native**: Mobile app framework
- **Expo**: Development platform
- **TypeScript**: Type-safe JavaScript
- **Firebase**: Backend services
  - Authentication
  - Firestore Database
- **React Navigation**: Navigation library
- **React Native Paper**: Material Design UI library
- **React Native Gesture Handler**: Gesture handling
- **React Native Reanimated**: Smooth animations

## Future Enhancements

This is the base implementation. Future features may include:
- Statistics and analytics
- Reminders and notifications
- Data export functionality
- Multi-language support
- Dark mode
- Offline support
- Charts and visualizations

## Troubleshooting

### Google Sign-in Issues
- Ensure your Google Web Client ID is correct
- Check that Google Sign-in is enabled in Firebase Console
- Verify your app's package name matches Firebase configuration

### Build Errors
- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Update Expo: `expo upgrade`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
