import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { getUserId } from "~/lib/controllers/fetchers";
import socket from "~/lib/Gateway/announcement_socket";
import AnnouncementModal from "~/components/ui/announcement_modal";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function AnnouncementComponent() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);

  // Register for push notifications
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const temp = await getUserId();
        if (temp) {
          setId(temp);
          console.log(`User ID: ${temp}`);
        } else {
          console.warn("User ID is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (!id) return;

    const eventName = `announcementToScreen-${id}`;
    const handleAnnouncement = async (newAnnouncement: any) => {
      try {
      console.log("Received announcement:", newAnnouncement);
      setAnnouncement(newAnnouncement);

      await Notifications.scheduleNotificationAsync({
        content: {
        title: "📢 New Announcement!",
        body: newAnnouncement.message || "You have a new announcement.",
        data: newAnnouncement,
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "#FFC100#98D8EF", 
        },
        trigger: null, 
      });
      } catch (error) {
      console.error("Error handling announcement:", error);
      }
    };

    try {
      socket.on(eventName, handleAnnouncement);
      console.log(`Listening for event: ${eventName}`);
    } catch (error) {
      console.error(`Error setting up socket listener for ${eventName}:`, error);
    }

    return () => {
      try {
        console.log(`Stopped listening for event: ${eventName}`);
        socket.off(eventName, handleAnnouncement);
      } catch (error) {
        console.error(`Error removing socket listener for ${eventName}:`, error);
      }
    };
  }, [id]);

  return (
    <View>
      {/* Announcement Modal Overlay */}
      {announcement && (
        <AnnouncementModal
          announcement={announcement}
          duration={parseInt(announcement.duration, 10)}
        />
      )}
    </View>
  );
}

// Function to register for push notifications
async function registerForPushNotifications() {
  try {
    if (!Device.isDevice) {
      Alert.alert("Must use a physical device for push notifications");
      return;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Enable push notifications in settings.");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    if (token) {
      console.log("Expo Push Token:", token);
    } else {
      console.warn("Failed to get Expo Push Token");
    }
  } catch (error) {
    console.error("Error registering for push notifications:", error);
  }
}
