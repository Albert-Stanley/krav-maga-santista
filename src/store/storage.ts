// src/store/storage.ts
import * as SecureStore from 'expo-secure-store';
import { StateStorage } from 'zustand/middleware';

// Adaptador que faz o SecureStore ser compatível com a interface StateStorage do Zustand
export const secureStorageAdapter: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (error) {
      console.error(`Failed to get item "${name}" from SecureStore`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.error(`Failed to set item "${name}" in SecureStore`, error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error(`Failed to remove item "${name}" from SecureStore`, error);
    }
  },
};
