import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

// 1 , egyptMotors , egypt , cairo , 1st line , 2nd line , google maps link
const addressSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    countryId: {
      type: String,
      required: true,
      ref: 'countries'
    },
    cityId: {
      type: String,
      required: true,
      ref: 'cities'
    },
    firstLine: {
      type: String,
      required: true
    },
    secondLine: {
      type: String,
      required: false
    },
    googleMapsLink: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

const AddressSchema = mongoose.model('addresses', addressSchema);

export default AddressSchema;
