import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

interface Announcement {
  message: string;
  title: string;
  flightNumber: string;
  gate: string;
}

interface AnnouncementModalProps {
  announcement: Announcement;
  duration: number;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ announcement, duration }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (announcement) {
      setVisible(true);

      // Close modal after the specified duration
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [announcement, duration]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{announcement.title || "Announcement"}</Text>
          <Text style={styles.modalText}>{announcement.message || "New Announcement!"}</Text>
          <Text style={styles.modalText}>Flight Number: {announcement.flightNumber}</Text>
          <Text style={styles.modalText}>Gate: {announcement.gate}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    borderColor: "#73C7C7",  
    borderWidth: 2,     
  },
  modalTitle: {
    fontSize: 50,
    fontWeight: "bold",  
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poller One",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Cormorant Garamond", 
  },
});

export default AnnouncementModal;