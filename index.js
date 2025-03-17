// console.log("Sample Application")
const admin = require("firebase-admin");
const fs = require("fs");
const { notificationData } = require("./notificationData")

// Load your Firebase service account key
// const serviceAccount = require("./path-to-your-service-account.json");
const serviceAccount = require("./service-account.json");//Add this service File

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Load JSON data
// const notificationData = [
//   {
//     // "Device Id": "device_token_1",
//     "Device Id": "e3WhMfqZQ8iPq7R7tZuFfm:APA91bGh3Tcdas77woZViekgwmT4WEb11CBHUSeVVfJ0Jdb3OCx6BQFiU_ycabHULChaGtGvojBtsI5VL2TGwdvD1pI834JeTS4eZ1BAqD4oYOCjcWWd6go",
//     "Title": "Notification Title 1",
//     "Body": "Notification Body 1"
//   },
//   {
//     "Device Id": "cLhXse8IR8WvhqWNKZOs3x:APA91bEVz853Wdeu-5BP_ZF_eSWPI_X2XEFKXeplY9k-C9OSjH-9hKjqym56vtoJZUvHYpNhWOwjStn8z6ixUaLesTCqovULIEBywwEYNTR1EuedrtK4Bio",
//     "Title": "Vinay Babu",
//     "Body": "Body"
//   }
// ];

// Function to send notifications
const sendNotification = async (data) => {
  const message = {
    token: data["Device Id"],
    notification: {
      title: data["Title"],
      body: data["Body"]
    }
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Send notifications for each entry
notificationData.forEach((notification) => {
  sendNotification(notification);
});
