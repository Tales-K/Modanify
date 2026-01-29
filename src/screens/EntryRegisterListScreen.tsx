import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {
  Text,
  Card,
  FAB,
  ActivityIndicator,
  Chip,
  IconButton,
  Menu,
} from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { RegisterEntry } from '../types';
import { getUserRegisterEntries, deleteRegisterEntry } from '../services/registerService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const EntryRegisterListScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [entries, setEntries] = useState<RegisterEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState<{ [key: string]: boolean }>({});

  const loadEntries = useCallback(async () => {
    if (!user) return;

    try {
      const fetchedEntries = await getUserRegisterEntries(user.uid);
      setEntries(fetchedEntries);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const onRefresh = () => {
    setRefreshing(true);
    loadEntries();
  };

  const handleDelete = async (entryId: string) => {
    try {
      await deleteRegisterEntry(entryId);
      setEntries(entries.filter((entry) => entry.id !== entryId));
      setMenuVisible({ ...menuVisible, [entryId]: false });
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const getTypeColor = (type: RegisterEntry['type']) => {
    switch (type) {
      case 'activity':
        return '#4caf50';
      case 'health':
        return '#f44336';
      case 'habit':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderEntry = ({ item }: { item: RegisterEntry }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Text variant="titleMedium" style={styles.title}>
              {item.title}
            </Text>
            <Chip
              mode="outlined"
              style={[styles.chip, { borderColor: getTypeColor(item.type) }]}
              textStyle={{ color: getTypeColor(item.type) }}
            >
              {item.type}
            </Chip>
          </View>
          <Menu
            visible={menuVisible[item.id] || false}
            onDismiss={() => setMenuVisible({ ...menuVisible, [item.id]: false })}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={() => setMenuVisible({ ...menuVisible, [item.id]: true })}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                setMenuVisible({ ...menuVisible, [item.id]: false });
                navigation.navigate('EntryForm', { entry: item });
              }}
              title="Edit"
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={() => handleDelete(item.id)}
              title="Delete"
              leadingIcon="delete"
            />
          </Menu>
        </View>
        <Text variant="bodyMedium" style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text variant="bodySmall" style={styles.date}>
            {formatDate(item.date)}
          </Text>
          {item.value !== undefined && (
            <Text variant="bodySmall" style={styles.value}>
              {item.value} {item.unit}
            </Text>
          )}
          {item.completed !== undefined && (
            <Chip
              icon={item.completed ? 'check-circle' : 'circle-outline'}
              compact
            >
              {item.completed ? 'Completed' : 'Pending'}
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              No entries yet. Tap the + button to create your first entry!
            </Text>
          </View>
        }
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('EntryForm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  chip: {
    height: 24,
  },
  description: {
    marginBottom: 12,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  date: {
    color: '#999',
  },
  value: {
    color: '#666',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
  },
});
