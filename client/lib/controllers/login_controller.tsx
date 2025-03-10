import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

export async function login(username: string, password: string) {
    const extra = Constants.manifest?.extra || Constants.expoConfig?.extra;
    const apiEndpoint = extra?.apiUrl;
  try {

    const response = await fetch(apiEndpoint + "/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.access_token) {
      // Securely store the JWT token
      await SecureStore.setItemAsync('auth_token', data.access_token, {
        keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
      });
      await SecureStore.setItemAsync('data', JSON.stringify(data), {
        keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY
      });
      return data.userRole;
    } else {
      throw new Error('Your Password or Username is incorrect');
    }
  } catch (error) {
    throw error;
  }
}
