import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { listenForAnnouncement, stopListeningForAnnouncement } from '~/lib/Gateway/announcement_service';
import { getUserId } from '~/lib/controllers/fetchers';
import socket from '~/lib/Gateway/announcement_socket';

export function AnnouncementComponent() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);

  // Fetch the user ID once when the component mounts
  useEffect(() => {
    const fetchId = async () => {
      const temp = await getUserId();
      setId(temp);
      console.log(`User ID: ${temp}`);
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (!id) return; // Wait until we have an ID

    const eventName = `announcementToScreen-${id}`;
    const handleAnnouncement = (newAnnouncement: any) => {
      console.log('Received announcement:', newAnnouncement);
      setAnnouncement(newAnnouncement);
    };

    socket.on(eventName, handleAnnouncement);
    console.log(`Listening for event: ${eventName}`);

    // Clean up the listener when the component unmounts or id changes
    return () => {
      console.log(`Stopped listening for event: ${eventName}`);
      socket.off(eventName, handleAnnouncement);
    };
  }, [id]);
    

  return (
    <View>
      {announcement ? (
        <Text>{JSON.stringify(announcement)}</Text>
      ) : (
        <Text>No announcements yet.</Text>
      )}
    </View>
  );
}
