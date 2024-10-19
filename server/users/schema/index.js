import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      default: null
    },
    phoneNumber: {
      type: String,
      required : true,
    },
    role: {
      type: String,
      enum: ['OWNER', 'CLIENT'],
      default: 'Client'
    },
    resetPasswordToken: {
      type: String,
      default: null
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verifyPasswordToken: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
