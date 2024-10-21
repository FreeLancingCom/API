import mongoose from 'mongoose';
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
    name: {
      type: String,
      required: true
    },
    packageId: {
      type: String,
      required: true,
      default: 'undefined',
      ref: 'packages'
    },
    description: {
      type: String,
      required: true
    },

    images: [{ type: String }],

    availableQuantity: {
      type: Number,
      required: true
    },
    addedBy: {
      type: String,
      required: true,
      ref: 'users'
    },
    price: {
      type: pricesDetailsSchema,
      required: true
    },
    stars:{
      type: Number,
      default: 0 ,
    },

    tags: [{ type: String }]
  },
  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);
export default Product;
