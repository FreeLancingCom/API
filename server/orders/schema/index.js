import mongoose from 'mongoose';
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHODS } from '../helpers/constants.js';

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  postalCode: String,
  country: String
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    address: {
      type: addressSchema,
      required: true
    },

    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    },

    status: {
      type: String,
      enum: Object.keys(ORDER_STATUS),
      default: 'PENDING'
    },

    paymentMethod: {
      type: String,
      enum: Object.keys(PAYMENT_METHODS),
      required: true
    },

    paymentStatus: {
      type: String,
      enum: Object.keys(PAYMENT_STATUS),
      default: PAYMENT_STATUS['PENDING']
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
