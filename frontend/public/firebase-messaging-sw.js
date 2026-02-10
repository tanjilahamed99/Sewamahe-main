/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

// 🔥 Firebase Init
firebase.initializeApp({
  apiKey: "AIzaSyB6kx9GkraG5U4xoPNPv62MrKPTNbdcmLk",
  authDomain: "sewamahe-dd4c2.firebaseapp.com",
  projectId: "sewamahe-dd4c2",
  storageBucket: "sewamahe-dd4c2.firebasestorage.app",
  messagingSenderId: "398089760302",
  appId: "1:398089760302:web:f8a786affb3e936d42b9bf",
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

  const data = payload.data;
  const { type } = data;

  // console.log("[SW] BG Payload:", data);

  // 🟢 CALL NOTIFICATION
  if (type === "call") {
    self.registration.showNotification("Incoming Call", {
      body: `${data.callerName} is calling you`,
      icon: "/call.png",
      tag: "incoming-call",
      requireInteraction: true,
      actions: [
        { action: "accept", title: "Accept" },
        { action: "reject", title: "Reject" },
      ],
      data,
    });
    return;
  }

  // 🔵 MESSAGE NOTIFICATION (UNCHANGED)
  if (type === "message") {
    self.registration.showNotification(data.title || "New Message", {
      body: data.body || "You have a new message",
      icon: "/message.png",
      tag: "chat-message",
      data,
    });
    return;
  }

  // ⚪ DEFAULT
  if (payload.notification) {
    self.registration.showNotification(
      payload.notification.title || "Notification",
      {
        body: payload.notification.body || "",
        icon: "/message.png",
        data: payload.data || {},
      },
    );
  }
});

/**
 * NOTIFICATION CLICK HANDLER
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const action = event.action;

  console.log(data);

  event.waitUntil(
    (async () => {
      // ❌ REJECT → DO NOTHING
      if (data.type === "call" && action === "reject") {
        return;
      }

      const allClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      // ✅ ACCEPT → OPEN APP ONLY
      if (data.type === "call" && action === "accept") {
        const targetUrl = `/meeting/${data.meetingID}`;

        for (const client of allClients) {
          await client.focus();
          client.postMessage({
            type: "INCOMING_CALL",
            payload: data,
          });
          return;
        }

        const newClient = await clients.openWindow(targetUrl);

        setTimeout(() => {
          newClient?.postMessage({
            type: "INCOMING_CALL",
            payload: data,
          });
        }, 800);

        return;
      }

      // 🔵 MESSAGE CLICK (UNCHANGED)
      if (data.type === "message") {
        const targetUrl = `/room/${data.roomId}`;

        for (const client of allClients) {
          await client.navigate(targetUrl);
          await client.focus();
          return;
        }

        await clients.openWindow(targetUrl);
        return;
      }

      await clients.openWindow("/");
    })(),
  );
});
