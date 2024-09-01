import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';
import { SERVICE_STATUS } from '../helpers/constants.js';

const serviceTypeSchema = new mongoose.Schema(
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
      default: SERVICE_STATUS.APPROVED
    },
    creatorId: {
      type: String,
      ref: 'users',
      required: true
    }
  },
  { timestamps: true }
);

const ServiceType = mongoose.model('servicetypes', serviceTypeSchema);

export default ServiceType;
