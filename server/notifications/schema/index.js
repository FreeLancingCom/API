import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const targetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'users'
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    _id: false
  }
);

const notificationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    targets: {
      type: [targetSchema],
    },
    contentType: {
      type: String,
      required: true,
      enum: ['ad', 'message']
    },
    adId: {
      type: String,
      ref: 'advertisements'
    },
    message: {
      type: String
    },
    sender: {
      type: String,
      ref: 'users'
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

const Notifications = mongoose.model('notifications', notificationSchema);

export default Notifications;
