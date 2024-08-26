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
  {
    _id: false
  }
);

const offersDetailsSchema = new mongoose.Schema(
  {
    offerType: {
      type: String,
      required: true,
      enum: ['TIMED', 'UNLIMITED'],
      default: null
    },
    from: {
      type: Date,
      default: null
    },
    to: {
      type: Date,
      default: null
    }
  },
  {
    _id: false
  }
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
    }
  },
  {
    availableQuantity: {
      type: Number,
      required: true
    },
    // categoryId: {
    //   type: String,
    //   ref: 'categories'
    // },
    // subcategoryId: [
    //   {
    //     type: String,
    //     required: true,
    //     ref: 'subcategories'
    //   }
    // ],
    // brandId: {
    //   type: String,
    //   ref: 'brands'
    // },
    price: {
      type: pricesDetailsSchema
    },
    offer: {
      type: offersDetailsSchema
    },
    currency: {
      type: String,
      required: true
    },
    images: [
      {
        type: String
      }
    ],
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
    tags: [
      {
        type: String
      }
    ],
    //   maintenanceCenterId:{
    //     type: String,
    //     ref: 'maintenanceCenters'
    //   }
    typeId: {
      type: String,
      ref: 'producttypes'
    }
  },

  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);

export default Product;
