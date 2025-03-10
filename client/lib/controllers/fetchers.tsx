import * as SecureStore from 'expo-secure-store';

export async function getAuthToken(): Promise<string | null> {
  return await SecureStore.getItemAsync('auth_token');
}

export async function getUserData(): Promise<any | null> {
    const data = await SecureStore.getItemAsync('data');
    return data ? JSON.parse(data) : null;
  }
  