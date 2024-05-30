
const Notification = require('../models/Notification');


const sendNotification = async (user_id, message, io) => {
    try {
      // Create notification in the database
      const notification = await Notification.create({
        user_id,
        message,
        is_read: false,
        created_at: new Date(),
      });
  
      // Emit the notification to the user using Socket.io
      io.to(`user_${user_id}`).emit('notification', notification);
    } catch (err) {
      console.error('Error sending notification:', err);
    }
  };


  module.exports = sendNotification;