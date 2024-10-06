


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

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  price: pricesDetailsSchema,

  images: {
    type: [String],
    required: true
  },
  description: {
    type: String,
  },
  availableQuantity: {
    type: Number,
    required: true
  },
  tags: [{ type: String }]
});

const Package = mongoose.model('Package', packageSchema);
export default Package;