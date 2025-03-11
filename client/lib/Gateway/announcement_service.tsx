// announcementService.ts
import socket from '~/lib/Gateway/announcement_socket';
import { getUserId } from '../controllers/fetchers';

// Start listening for the createAnnouncement event
export const listenForAnnouncement = (callback: (announcement: any) => void) => {
  const id = getUserId();
  socket.on(`announcementToScreen-${id}`, callback);
};

// Stop listening for the createAnnouncement event
export const stopListeningForAnnouncement = (callback: (announcement: any) => void) => {
    const id = getUserId();
    socket.off(`announcementToScreen-${id}`, callback);
};
