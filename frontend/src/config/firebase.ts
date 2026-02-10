// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6kx9GkraG5U4xoPNPv62MrKPTNbdcmLk",
  authDomain: "sewamahe-dd4c2.firebaseapp.com",
  projectId: "sewamahe-dd4c2",
  storageBucket: "sewamahe-dd4c2.firebasestorage.app",
  messagingSenderId: "398089760302",
  appId: "1:398089760302:web:f8a786affb3e936d42b9bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BLD3Wqd3EoWKHZOx0x0RfQs3QSFgCB4_kIcG1RzsHfP6LhPQfqEHwCaYtMz4LKtmjOknpEOAPP3MhvkiMWsq6PI",
    });
    console.log(token);
  }
};
