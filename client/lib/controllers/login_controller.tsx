import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

export async function login(username: string, password: string) {
    const extra = Constants.manifest?.extra || Constants.expoConfig?.extra;
    const apiEndpoint = extra?.apiUrl;
    try {
        const response = await fetch(`${apiEndpoint}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log('Login Response: ', data);
        if (data.access_token) {
            // Securely store the JWT token
            await SecureStore.setItemAsync('auth_token', data.access_token, {
                keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
            });
            await SecureStore.setItemAsync('data', JSON.stringify(data), {
                keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
            });
            await SecureStore.setItemAsync('username', username, {
                keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
            });
            await SecureStore.setItemAsync('password', username, {
                keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
            });
            return data.userRole;
        } else {
            throw new Error('Your Password or Username is incorrect');
        }
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    await SecureStore.deleteItemAsync('auth_token');
    await SecureStore.deleteItemAsync('data');
    await SecureStore.deleteItemAsync('username');
    await SecureStore.deleteItemAsync('password');
}

//! Temperory
//TODO: Make this a cron job in production
export async function refreshUserData() {
    try {
        const storedData = await SecureStore.getItemAsync('data');
        const username = await SecureStore.getItemAsync('username');
        const password = await SecureStore.getItemAsync('password');
        if (!storedData) return;

        const parsedData = JSON.parse(storedData);
        const userId = parsedData.userId;
        const token = await SecureStore.getItemAsync('auth_token');

        if (!userId || !token) return;

        const extra = Constants.manifest?.extra || Constants.expoConfig?.extra;
        const apiEndpoint = extra?.apiUrl;

        // Fetch the latest user data
        const response = await fetch(`${apiEndpoint}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const newData = await response.json();

        if (newData) {
            // Update SecureStore with the latest user data
            await SecureStore.setItemAsync('data', JSON.stringify(newData), {
                keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
            });
        }
    } catch (error) {
        console.error('Error refreshing user data:', error);
    }
}
