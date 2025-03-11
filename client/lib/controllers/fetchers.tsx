import * as SecureStore from 'expo-secure-store';

//get saved auth token
export async function getAuthToken(): Promise<string | null> {
  return await SecureStore.getItemAsync('auth_token');
}

//get saved data
export async function getData(): Promise<any | null> {
    const data = await SecureStore.getItemAsync('data');
    return data ? JSON.parse(data) : null;
  }

//get user data
export async function getUserData() {
    const data = await getData();
    return data ? data.userScreen : null;
}

//get user role
export async function getUserRole(): Promise<String | null> {
    const data = await getData();
    return data ? data.userRole : null;
  }

//get ads data
export async function getAdsData(): Promise<any | null> {
    const data = await getData();
    return data ? data.userAds : null;
  }