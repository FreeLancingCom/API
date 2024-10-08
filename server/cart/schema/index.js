import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'users'
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
        ref: 'products'
      },
      quantity: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  packages: [
    {
      packageId: {
        type: String,
        required: true,
        ref: 'packages'
      },
      quantity: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],

  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
