import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
   
    userId: {
      type: String,
      required: true,
      ref: 'users'
    },
    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
        type: String,
        required: true
    },
  
  
    firstLine: {
      type: String,
      required: true
    },
    secondLine: {
      type: String,
      required: false
    },
    googleMapsLink: {
      type: String,
      required: false
    },
   
  },
  { timestamps: true }
);

const Address = mongoose.model('addresses', addressSchema);

export default Address;