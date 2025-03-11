import { io } from 'socket.io-client';
import Constants from 'expo-constants';

const extra = Constants.manifest?.extra || Constants.expoConfig?.extra;
const socketUrl = extra?.socketUrl;

const socket = io(socketUrl, { transports: ['websocket'] });

// Log connection status
socket.on('connect', () => {
  console.log('Socket connected with id:', socket.id);
});
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export default socket;
