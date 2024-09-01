import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const pricesDetailsSchema = new mongoose.Schema(
  {
    originalPrice: {
      type: Number,
      required: true
    },
    finalPrice: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
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
      type: String
    },
    description: {
      type: String,
    },
    availableQuantity: {
      type: Number,
      required: true
    },
    price: {
      type: pricesDetailsSchema,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    images: [{ type: String }],
    tags: [{ type: String }],
    maintenanceCenterId: {
      type: String,
      ref: 'MaintenanceCenter',
      required: true
    },
    typeId: {
      type: String,
      ref: 'producttypes',
      required: true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);

export default Product;
