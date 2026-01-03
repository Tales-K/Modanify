import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import {
  TextInput,
  Button,
  SegmentedButtons,
  Switch,
  Text,
  Appbar,
} from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { createRegisterEntry, updateRegisterEntry } from '../services/registerService';
import { RegisterEntry } from '../types';
import DateTimePicker from '@react-native-community/datetimepicker';

interface EntryFormScreenProps {
  navigation: any;
  route?: {
    params?: {
      entry?: RegisterEntry;
    };
  };
}

export const EntryFormScreen: React.FC<EntryFormScreenProps> = ({ navigation, route }) => {
  const { user } = useAuth();
  const existingEntry = route?.params?.entry;
  const isEditing = !!existingEntry;

  const [type, setType] = useState<RegisterEntry['type']>(existingEntry?.type || 'activity');
  const [title, setTitle] = useState(existingEntry?.title || '');
  const [description, setDescription] = useState(existingEntry?.description || '');
  const [date, setDate] = useState(existingEntry?.date || new Date());
  const [value, setValue] = useState(existingEntry?.value?.toString() || '');
  const [unit, setUnit] = useState(existingEntry?.unit || '');
  const [completed, setCompleted] = useState(existingEntry?.completed || false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!user || !title.trim()) {
      return;
    }

    try {
      setSaving(true);
      const entryData = {
        type,
        title: title.trim(),
        description: description.trim(),
        date,
        value: value ? parseFloat(value) : undefined,
        unit: unit.trim() || undefined,
        completed: type === 'habit' ? completed : undefined,
      };

      if (isEditing && existingEntry) {
        await updateRegisterEntry(existingEntry.id, entryData);
      } else {
        await createRegisterEntry(user.uid, entryData);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isEditing ? 'Edit Entry' : 'New Entry'} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text variant="labelLarge" style={styles.label}>
          Type
        </Text>
        <SegmentedButtons
          value={type}
          onValueChange={(value) => setType(value as RegisterEntry['type'])}
          buttons={[
            { value: 'activity', label: 'Activity' },
            { value: 'health', label: 'Health' },
            { value: 'habit', label: 'Habit' },
          ]}
          style={styles.segmentedButtons}
        />

        <TextInput
          label="Title *"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          icon="calendar"
          style={styles.input}
        >
          Date: {date.toLocaleDateString()}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <View style={styles.row}>
          <TextInput
            label="Value (optional)"
            value={value}
            onChangeText={setValue}
            mode="outlined"
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
          />
          <TextInput
            label="Unit"
            value={unit}
            onChangeText={setUnit}
            mode="outlined"
            style={[styles.input, styles.halfInput]}
            placeholder="e.g., km, min, glasses"
          />
        </View>

        {type === 'habit' && (
          <View style={styles.switchContainer}>
            <Text variant="bodyLarge">Completed</Text>
            <Switch value={completed} onValueChange={setCompleted} />
          </View>
        )}

        <Button
          mode="contained"
          onPress={handleSave}
          loading={saving}
          disabled={saving || !title.trim()}
          style={styles.saveButton}
        >
          {isEditing ? 'Update Entry' : 'Create Entry'}
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  label: {
    marginBottom: 8,
    color: '#666',
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 32,
  },
});
