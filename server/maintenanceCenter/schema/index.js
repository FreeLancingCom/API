import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const maintenanceCenterAddressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true
    },
    firstLine: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const countrySchema = new mongoose.Schema(
  {
    _id: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const maintenanceCenterSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  landline: {
    type: String,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  taxRegistrationNo: {
    type: String,
    required: true
  },
  commercialRegistrationNo: {
    type: String,
    required: true
  },
  admins: [
    {
      type: String,
      ref: 'User',
      required: true
    }
  ],
  country: {
    type: countrySchema,
    ref: 'Countries',
    required: true
  },
  address: {
    type: maintenanceCenterAddressSchema,
    required: true
  },
  review_score: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
});

const MaintenanceCenter = mongoose.model('MaintenanceCenter', maintenanceCenterSchema);

export default MaintenanceCenter;
