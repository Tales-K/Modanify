import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export const LoginScreen: React.FC = () => {
  const { signInWithGoogle, loading } = useAuth();
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          Modanify
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Track your activities, health, and habits
        </Text>
        
        <Button
          mode="contained"
          onPress={handleGoogleSignIn}
          loading={isSigningIn}
          disabled={isSigningIn}
          style={styles.button}
          icon="google"
        >
          Sign in with Google
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  subtitle: {
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
