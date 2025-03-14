import { io } from 'socket.io-client';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const extra = Constants.manifest?.extra || Constants.expoConfig?.extra;
const socketUrl = extra?.socketUrl;

const socket = io(socketUrl, { transports: ['websocket'] });
// Alert.alert('Socket URL', socketUrl);
// Log connection status
socket.on('connect', () => {
  console.log('Socket connected with id:', socket.id);
  // Alert.alert('Socket connected with id:', socket.id);
});
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
  // Alert.alert('Socket connection error:', error);
});

export default socket;
