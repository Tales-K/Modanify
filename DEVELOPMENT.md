# Development Guide

This guide provides information for developers working on the Modanify project.

## Project Overview

Modanify is a React Native mobile application built with Expo that allows users to track their daily activities, health metrics, and habits. The app uses Firebase for backend services and follows Material Design principles.

## Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Backend:** Firebase (Authentication, Firestore)
- **UI Library:** React Native Paper (Material Design)
- **Navigation:** React Navigation v6
- **State Management:** React Context API
- **Date/Time:** React Native Community DateTimePicker

## Project Structure

```
Modanify/
├── src/
│   ├── components/       # Reusable UI components
│   ├── config/          # Configuration files
│   │   └── firebase.ts  # Firebase initialization
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── navigation/      # Navigation configuration
│   │   └── AppNavigator.tsx  # Main navigation setup
│   ├── screens/         # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── EntryRegisterListScreen.tsx
│   │   ├── EntryFormScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── index.ts     # Screen exports
│   ├── services/        # Business logic and API calls
│   │   └── registerService.ts  # Firestore operations
│   └── types/           # TypeScript type definitions
│       └── index.ts     # Shared types
├── assets/              # Images, fonts, and other assets
├── App.tsx             # Main app component
├── index.ts            # App entry point
├── app.json            # Expo configuration
├── babel.config.js     # Babel configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript configuration
```

## Development Workflow

### 1. Setting Up Your Environment

```bash
# Clone the repository
git clone https://github.com/Tales-K/Modanify.git
cd Modanify

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your Firebase credentials
```

### 2. Running the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web
npm run web
```

### 3. Development Commands

```bash
# Type checking
npx tsc --noEmit

# Clear cache
expo start -c

# Update dependencies
expo upgrade

# Install new package
npm install <package-name>
```

## Key Components

### Authentication Flow

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages authentication state
   - Provides `signInWithGoogle()` and `signOut()` methods
   - Listens to Firebase auth state changes

2. **LoginScreen** (`src/screens/LoginScreen.tsx`)
   - Displays Google Sign-in button
   - Handles authentication errors

### Navigation Structure

The app uses a nested navigation structure:

```
Stack Navigator (Root)
├─ Login Screen (if not authenticated)
└─ Stack Navigator (if authenticated)
   ├─ Drawer Navigator (Main)
   │  ├─ Entry Register List (default)
   │  └─ Profile
   └─ Entry Form Screen (modal)
```

### Data Management

1. **registerService** (`src/services/registerService.ts`)
   - `createRegisterEntry()`: Creates a new entry
   - `updateRegisterEntry()`: Updates an existing entry
   - `deleteRegisterEntry()`: Deletes an entry
   - `getUserRegisterEntries()`: Fetches all entries for a user

2. **RegisterEntry Type** (`src/types/index.ts`)
   ```typescript
   {
     id: string;
     userId: string;
     date: Date;
     type: 'activity' | 'health' | 'habit';
     title: string;
     description: string;
     value?: number;
     unit?: string;
     completed?: boolean;
     createdAt: Date;
     updatedAt: Date;
   }
   ```

## Coding Standards

### TypeScript

- Always use TypeScript for type safety
- Define interfaces for all data structures
- Avoid using `any` type
- Use proper types for React components and hooks

### React Components

- Use functional components with hooks
- Follow the React hooks rules
- Use proper prop types with TypeScript interfaces
- Extract reusable logic into custom hooks

### Code Organization

- Keep components small and focused
- Separate business logic from UI components
- Use meaningful variable and function names
- Add comments for complex logic

### Naming Conventions

- **Components:** PascalCase (e.g., `LoginScreen`)
- **Functions:** camelCase (e.g., `signInWithGoogle`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `COLLECTION_NAME`)
- **Types/Interfaces:** PascalCase (e.g., `RegisterEntry`)

## Adding New Features

### Adding a New Screen

1. Create a new screen component in `src/screens/`
2. Add the screen to the navigation in `src/navigation/AppNavigator.tsx`
3. Update type definitions in `src/types/index.ts`
4. Export the screen from `src/screens/index.ts`

Example:

```typescript
// src/screens/NewScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const NewScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>New Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Adding a New Service

1. Create a new service file in `src/services/`
2. Implement Firebase operations
3. Export functions for use in screens/components
4. Handle errors appropriately

### Adding a New Type

1. Add type definitions to `src/types/index.ts`
2. Export the type for use throughout the app

## UI Guidelines

### Material Design

The app uses React Native Paper which follows Material Design guidelines:

- Use Paper components whenever possible
- Follow Material Design color schemes
- Maintain consistent spacing (use multiples of 8)
- Use appropriate elevation for cards and surfaces

### Component Library

Common React Native Paper components used:

- `Button`: Action buttons
- `TextInput`: Text input fields
- `Card`: Content containers
- `FAB`: Floating Action Button
- `Appbar`: Top app bars
- `Menu`: Dropdown menus
- `Chip`: Compact information display
- `Avatar`: User profile images

### Styling

- Use StyleSheet.create() for styles
- Follow consistent spacing (8, 16, 24, 32, etc.)
- Use theme colors when possible
- Ensure proper contrast for accessibility

## Testing

### Manual Testing Checklist

- [ ] Authentication flow works correctly
- [ ] User can create new entries
- [ ] User can edit existing entries
- [ ] User can delete entries
- [ ] Entries are properly saved to Firestore
- [ ] Date picker works for past dates
- [ ] All three entry types (activity, health, habit) work
- [ ] Navigation drawer opens and closes
- [ ] Profile screen displays user information
- [ ] Sign out functionality works

### Testing on Different Platforms

- Test on Android devices/emulators
- Test on different screen sizes
- Test with different Android versions

## Common Issues and Solutions

### Issue: "Firebase not configured"
**Solution:** Ensure `.env` file exists with correct Firebase credentials

### Issue: "Google Sign-in fails"
**Solution:** Check that Web Client ID is correct and Google sign-in is enabled in Firebase

### Issue: "Module not found"
**Solution:** Clear cache with `expo start -c` and reinstall dependencies

### Issue: "Build fails"
**Solution:** Update Expo SDK: `expo upgrade`

## Firebase Best Practices

1. **Security Rules:** Always implement proper security rules in production
2. **Data Validation:** Validate data on both client and server side
3. **Indexes:** Create composite indexes for complex queries
4. **Offline Support:** Consider implementing offline persistence
5. **Error Handling:** Always handle Firebase errors gracefully

## Performance Tips

1. **Lazy Loading:** Load data only when needed
2. **Memoization:** Use `useMemo` and `useCallback` for expensive operations
3. **FlatList:** Use FlatList for long lists with proper key extraction
4. **Image Optimization:** Optimize images before including in assets
5. **Bundle Size:** Monitor and minimize bundle size

## Git Workflow

1. Create a new branch for each feature
2. Make small, focused commits
3. Write descriptive commit messages
4. Test thoroughly before pushing
5. Create pull requests for review

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Future Improvements

Ideas for future enhancements:

1. **Statistics Dashboard:** Add charts and analytics
2. **Notifications:** Implement push notifications for reminders
3. **Themes:** Add dark mode support
4. **Export:** Allow data export to CSV/PDF
5. **Social Features:** Share achievements with friends
6. **Offline Mode:** Full offline support with sync
7. **Multi-language:** Internationalization support
8. **Widgets:** Home screen widgets for quick entry
9. **Wearables:** Integration with fitness trackers
10. **AI Insights:** Provide personalized insights based on data

## Contributing

We welcome contributions! Please:

1. Follow the coding standards outlined above
2. Test your changes thoroughly
3. Update documentation as needed
4. Submit pull requests with clear descriptions

## Getting Help

- Check existing documentation
- Review Firebase Console for backend issues
- Open an issue on GitHub
- Contact the development team
