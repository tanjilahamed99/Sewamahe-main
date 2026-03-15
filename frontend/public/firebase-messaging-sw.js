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

  const data = payload.data;
  const { type } = data;

  console.log("[SW] BG Payload:", data);

  // 🟢 CALL NOTIFICATION
  if (type === "call") {
    self.registration.showNotification("Incoming Call", {
      body: `${data.title}`,
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
