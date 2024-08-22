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
      required: true
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
    specifications: {
      type: Map,
      of: String
    },
    legalDoc: {
      type: String
    },
    video: {
      type: String,
      required: false
    },
    addedBy: {
      type: String,
      required: true,
      ref: 'users'
    },
    active: {
      type: Boolean,
      default: true
    },
    tags: [{ type: String }],
    maintenanceCenterId: {
      type: String,
      ref: 'MaintenanceCenter'
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);

export default Product;
