// User types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Register entry types for activity/health/habit tracking
export interface RegisterEntry {
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

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  EntryForm: { entry?: RegisterEntry } | undefined;
};

export type DrawerParamList = {
  EntryRegister: undefined;
  Profile: undefined;
};
