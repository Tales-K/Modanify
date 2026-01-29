import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import {
  LoginScreen,
  EntryRegisterListScreen,
  EntryFormScreen,
  ProfileScreen,
} from '../screens';
import { DrawerParamList, RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="EntryRegister"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#1976d2',
      }}
    >
      <Drawer.Screen
        name="EntryRegister"
        component={EntryRegisterListScreen}
        options={{
          title: 'Entry Register',
          drawerIcon: ({ color, size }) => (
            <IconButton icon="format-list-bulleted" iconColor={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => (
            <IconButton icon="account" iconColor={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen 
            name="EntryForm" 
            component={EntryFormScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
