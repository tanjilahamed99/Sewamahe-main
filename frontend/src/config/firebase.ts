// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPBFv-jorDEwQqtDLv6pKVtSIl1ljHrVU",
  authDomain: "sewamahe-fa6f5.firebaseapp.com",
  projectId: "sewamahe-fa6f5",
  storageBucket: "sewamahe-fa6f5.firebasestorage.app",
  messagingSenderId: "841071972020",
  appId: "1:841071972020:web:9cda360b4bbfcfbb2991e1",
  measurementId: "G-E12ZZ18J7R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BJn_eJYJlOc59hCYZUQgUgRS6hHjqZcEzBvoN1ot1Vu5Y6-cB113vfB7gphuyHaEXgnjD2FXLFc2bftotYF3KeM",
    });
  }
};
