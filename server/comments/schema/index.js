import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required : true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required : true
    },
    content: {
      type: String,
      required: true,
    },
    stars : {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);






const Comment = mongoose.model('comments', commentSchema);

export default Comment;
