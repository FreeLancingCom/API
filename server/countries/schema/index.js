import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const countrySchema = new mongoose.Schema({
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
    unique: true
  }
});

export default mongoose.model('Country', countrySchema);
