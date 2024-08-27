import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';
import { serviceTemplateStatuses } from '../helpers/constants.js';

const serviceTemplatesSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  nameAr: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: serviceTemplateStatuses.APPROVED,
    enum: Object.values(serviceTemplateStatuses)
  },
  creatorId: {
    // In case of a requested service by a user
    type: String,
    ref: 'users'
  }
});

const ServiceTemplates = mongoose.model('serviceTemplates', serviceTemplatesSchema);

export default ServiceTemplates;
