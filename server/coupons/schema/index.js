import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

// 1 , egyptMotors , egypt , cairo , 1st line , 2nd line , google maps link

const discountSchema = new mongoose.Schema(
  {
    percent: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
);
const couponSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    maintenanceCenterId: {
      type: String,
      required: true,
      ref: 'maintenanceCenter'
    },
    discount: discountSchema,

    dueDate: {
      type: Date,
      required: true
    }
  },

  { timestamps: true }
);

const CouponSchema = mongoose.model('coupon', couponSchema);

export default CouponSchema;
