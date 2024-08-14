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

const reviewsSchema = new mongoose.Schema(
  {
    employeesBehavior: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 0
    },
    honesty: {
      type: Number,
      default: 0
    },
    fairCost: {
      type: Number,
      default: 0
    },
    efficiency: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
)

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
  products: [
    {
      _id: {
        type: String,
        ref: 'Product',
        required: true
      },
      cost: {
        type: Number,
        required: true
      }
    }
  ],
  services: [
    {
      _id: {
        type: String,
        ref: 'Service',
        required: true
      },
      cost: {
        type: Number,
        required: true
      }
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
  totalReviews: {
    type: reviewsSchema,
    default: () => ({})
  },
  averageReviews: {
    type: reviewsSchema,
  },
  reviewsCount: {
    type: Number,
    default: 0
  }
});

const MaintenanceCenter = mongoose.model('MaintenanceCenter', maintenanceCenterSchema);

export default MaintenanceCenter;
