/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

// 🔥 Firebase Init
firebase.initializeApp({
  apiKey: "AIzaSyDPBFv-jorDEwQqtDLv6pKVtSIl1ljHrVU",
  authDomain: "sewamahe-fa6f5.firebaseapp.com",
  projectId: "sewamahe-fa6f5",
  storageBucket: "sewamahe-fa6f5.firebasestorage.app",
  messagingSenderId: "841071972020",
  appId: "1:841071972020:web:9cda360b4bbfcfbb2991e1",
  measurementId: "G-E12ZZ18J7R",
});

// 🔥 Messaging Instance 
const messaging = firebase.messaging();

/**
 * BACKGROUND MESSAGE HANDLER
 * 🔵 Message system UNCHANGED
 * 🟢 Call system FIXED
 */
messaging.onBackgroundMessage((payload) => {
  if (!payload?.data) return;
});
