import mongoose from 'mongoose';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import nanoid from '../../../common/utils/nanoID/index.js';
import { ENGINE_TYPE, GEAR_SHIFT_TYPE } from '../helpers/constants.js';

const vehicleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    
    modelAr: {
      type: String
    },
    plateNumber: {
      type: String,
      required: true,
      unique: true
    },
    engineType: {
      type: String,
      enum: Object.values(ENGINE_TYPE),
      default: ENGINE_TYPE.PETROL
    },
    tankCapacity: {
      type: String,
    },
    
    motorNumber: {
      type: String
    },
    chassisNumber: {
      type: String
    },

    gearShiftType: {
      type: String,
      enum: Object.values(GEAR_SHIFT_TYPE),
      default: GEAR_SHIFT_TYPE.AUTO
    },
    CCNumber: {
      type: Number
    },
    userId: {
      type: String,
      ref: 'users'
    }

  },
  { timestamps: true }
);

const Vehicle = mongoose.model('vehicles', vehicleSchema);

export default Vehicle;
