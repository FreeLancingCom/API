import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';
import { servicesTypes } from '../helpers/constants.js';

const servicesSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: Object.values(servicesTypes)
  },
  maintenanceCenterId: {
    // In case of a custom service
    type: String,
    ref: 'maintenanceCenters'
  },
  cost: { type: Number, required: true },
  typeId: {
    type: String,
    ref: 'servicetypes'
  }
});

const Services = mongoose.model('services', servicesSchema);

export default Services;
