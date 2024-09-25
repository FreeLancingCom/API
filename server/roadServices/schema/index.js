import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const roadServiceSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    mapsLink: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const RoadServiceSchema = mongoose.model('roadServices', roadServiceSchema);

export default RoadServiceSchema;
