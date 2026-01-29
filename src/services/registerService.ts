import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { RegisterEntry } from '../types';

const COLLECTION_NAME = 'registers';

// Convert Firestore timestamp to Date
const convertTimestamp = (timestamp: any): Date => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};

// Create a new register entry
export const createRegisterEntry = async (
  userId: string,
  entry: Omit<RegisterEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...entry,
      userId,
      date: Timestamp.fromDate(entry.date),
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating register entry:', error);
    throw error;
  }
};

// Update a register entry
export const updateRegisterEntry = async (
  entryId: string,
  updates: Partial<Omit<RegisterEntry, 'id' | 'userId' | 'createdAt'>>
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, entryId);
    const updateData: any = {
      ...updates,
      updatedAt: Timestamp.now(),
    };
    
    if (updates.date) {
      updateData.date = Timestamp.fromDate(updates.date);
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating register entry:', error);
    throw error;
  }
};

// Delete a register entry
export const deleteRegisterEntry = async (entryId: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, entryId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting register entry:', error);
    throw error;
  }
};

// Get all register entries for a user
export const getUserRegisterEntries = async (userId: string): Promise<RegisterEntry[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const entries: RegisterEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        userId: data.userId,
        date: convertTimestamp(data.date),
        type: data.type,
        title: data.title,
        description: data.description,
        value: data.value,
        unit: data.unit,
        completed: data.completed,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      });
    });
    
    return entries;
  } catch (error) {
    console.error('Error getting register entries:', error);
    throw error;
  }
};
