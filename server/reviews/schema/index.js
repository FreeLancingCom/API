import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const reviewSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    bookingId: {
      type: String,
      ref: 'bookings',
      required: true,
      unique: true
    },
    maintenanceCenterId: {
      type: String,
      ref: 'MaintenanceCenters',
      required: true
    },
    userId: {
      type: String,
      ref: 'users',
      required: true
    },
    employeesBehavior: {
      type: String,
      required: true,
    },
    speed: {
      type: String,
      required: true
    },
    honesty: {
      type: String,
      required: true
    },
    fairCost: {
      type: String,
      required: true
    },
    efficiency: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('reviews', reviewSchema);

export default Review;
