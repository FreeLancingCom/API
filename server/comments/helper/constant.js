export const CONTROLLERS = {
  LIST_COMMENTS: 'listComment',
  GET_COMMENT: 'getComment',
  ADD_COMMENT: 'addComment',
  UPDATE_COMMENT: 'updateComment',
  DELETE_COMMENT: 'deleteComment'
};

export const commentsError = {
  COMMENT_NOT_FOUND : {
    message: 'Comment not found',
    code: 101
  },
  COMMENT_ALREADY_EXISTS : {
    message: 'Comment already exists',
    code: 102
  },
  COMMENT_NOT_CREATED : {
    message: 'Comment not created',
    code: 103
  },
  COMMENT_NOT_UPDATED : {
    message: 'Comment not updated',
    code: 104
  },
  COMMENT_NOT_DELETED : {
    message: 'Comment not deleted',
    code: 105
  },
  USER_NOT_FOUND : {
    message: 'User not found',
    code: 106
  },
  PRODUCT_NOT_FOUND : {
    message: 'Product not found',
    code: 107
  },

}
