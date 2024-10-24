import mongoose from 'mongoose';
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHODS } from '../helpers/constants.js';

const addressSchema = new mongoose.Schema({
  firstLine : String,
  secondLine: String,
  street: String,
  googleLocation: String,
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
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          totalPrice: {
            type: Number,
            required: true
          }
        }
      ],
      packages: [
        {
          packageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Package',
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          totalPrice: {
            type: Number,
            required: true
          }
        }
      ],
      totalPrice: {
        type: Number,
        required: true
      }
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
    },
    paymentId: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
