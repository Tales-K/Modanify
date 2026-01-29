import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Card, Avatar } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {user?.photoURL ? (
            <Avatar.Image size={80} source={{ uri: user.photoURL }} />
          ) : (
            <Avatar.Icon size={80} icon="account" />
          )}
          <Text variant="headlineSmall" style={styles.name}>
            {user?.displayName || 'User'}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user?.email}
          </Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleSignOut}
        loading={isSigningOut}
        disabled={isSigningOut}
        style={styles.button}
        icon="logout"
      >
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  name: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 4,
    color: '#666',
  },
  button: {
    marginTop: 16,
  },
});
