import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

interface ToastProps {
  type: 'success' | 'error' | 'info'; 
  text1: string;
  text2: string;
  visibilityTime?: number;  
  position?: 'top' | 'bottom' | 'center';  
}

const CustomToast: React.FC<ToastProps> = ({
  type,
  text1,
  text2,
  visibilityTime = 3000,
  position = 'top',
}) => {

  // Function to show the toast
  const showToast = () => {
    Toast.show({
      type,
      position,
      text1,
      text2,
      visibilityTime,
    });
  };

  useEffect(() => {
    if (text1) {
      showToast();
    }
  }, [text1]);

};

export default CustomToast;
