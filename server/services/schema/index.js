import mongoose, { model } from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const servicesSchema = new mongoose.Schema({
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
  maintenanceCenterId: {
    type: String,
    required: true,
    ref: 'maintenanceCenters'
  },
  cost: { type: Number, required: true },
  model: { type: String },
  typeId: {
    type: String,
    ref: 'servicetypes',
    required: true
  }
});

const Services = mongoose.model('services', servicesSchema);

export default Services;
