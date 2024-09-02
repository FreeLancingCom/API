import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';
import { BOOKING_STATUS } from '../helpers/constants.js';

const pricesDetailsSchema = new mongoose.Schema({
  originalPrice: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true
  }
},
  {
    _id: false
  });


const bookingSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING
    },

    // couponId:{
    //   type:String,
    //   ref:'coupons'
    // },

    services: [
      {
        type: String,
        ref: 'services',
      },
    ],
    products: [
      {
        type: String,
        ref: 'products',
      },
    ], 
    VehicleId: {
      type: String,
      ref: 'vehicles'
    },
    clientId: {
      type: String,
      ref: 'users'
    },
    providerId: {
      type: String,
      ref: 'users'
    },
    price: {
      type: pricesDetailsSchema,
    },
    bookingTime: {
      type: Date
        }


  },
  { timestamps: true }
);

const Booking = mongoose.model('bookings', bookingSchema);

export default Booking;
