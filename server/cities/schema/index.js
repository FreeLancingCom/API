import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const citySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  nameAr: {
    type: String,
    required: true,
    unique: true
  },
  countryId: {
    type: String,
    required: true,
    ref: 'countries'
  }
});

export default mongoose.model('City', citySchema);
