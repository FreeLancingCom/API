import mongoose, { Mongoose } from 'mongoose';
import { COUPON_STATUS } from '../helpers/constants.js';

const discountSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['PERCENTAGE', 'FIXED']
  },
  value: {
    type: Number,
    required: true
  }
  
} , { _id : false} ); 

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discount: discountSchema,
  expiryDate: {
    type: Date,
    required: true
  },
  status : {
    type: String,
    enum: Object.keys(COUPON_STATUS),
    default: COUPON_STATUS.ACTIVE
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
