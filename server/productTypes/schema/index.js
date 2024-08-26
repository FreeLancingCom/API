import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';
import { PRODUCT_STATUS } from '../helpers/constants.js';

const productTypeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    name: {
      type: String,
      required: true
    },
    nameAr: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: PRODUCT_STATUS.APPROVED
    },
    creatorId: {
      type: String,
      ref: 'users',
      required: true
    }
  },
  { timestamps: true }
);

const ProductType = mongoose.model('producttypes', productTypeSchema);

export default ProductType;
