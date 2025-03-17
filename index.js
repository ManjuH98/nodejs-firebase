const admin = require("firebase-admin");
const fs = require("fs");
const { notificationData } = require("./notificationData")

// Load your Firebase service account key
const serviceAccount = require("./service-account.json");//Add this service File

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Function to send notifications
const sendNotification = async (data) => {
  const message = {
    token: data["Device Id"],
    notification: {
      title: data["Title"],
      body: data["Body"],
      image: data["Image"] || null
    },
    data:{
      link:data["Link"] || ""
    }
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error.errorInfo);
  }
};

const scheduleNotification = (notification) => {
  const scheduledTime = new Date(notification["Scheduled Time"]);

  if (!scheduledTime) {
    sendNotification(notification);
  } else {
    const scheduledDate = new Date(scheduledTime);
    const delay = scheduledTime - new Date();

    if (delay > 0) {
      setTimeout(() => sendNotification(notification), delay);
      console.log("Notification scheduled for:", scheduledTime);
    } else {
      console.error("Scheduled time is in the past. Sending immediately.");
      sendNotification(notification);
    }
  }
};

notificationData.forEach((notification) => {
  scheduleNotification(notification);
});
