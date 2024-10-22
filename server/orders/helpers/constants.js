export const CONTROLLERS = {
  LIST_ORDERS: 'LIST_ORDERS',
  GET_ORDER: 'GET_ORDER',
  CREATE_ORDER: 'CREATE_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  DELETE_ORDER: 'DELETE_ORDER'
};

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PLACED: 'PLACED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED'
};

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS'
};

export const PAYMENT_METHODS = {
  COD: 'COD',
  CARD: 'CARD'
};

export const ordersErrors = {
  ORDER_NOT_FOUND: {
    message: 'Order not found',
    code : 101
  },
  INVALID_STATUS: {
    message: 'Invalid status',
    code : 102
  },
  INVALID_PAYMENT_STATUS: {
    message: 'Invalid payment status',
    code : 103
  },
  INVALID_PAYMENT_METHOD: {
    message: 'Invalid payment method',
    code : 104
  },
  INVALID_ORDER: {
    message: 'Invalid order',
    code : 105

  },
  INVALID_ORDER_ID: {
    message: 'Invalid order id',
    code : 106

  },
  INVALID_ORDER_STATUS: {
    message: 'Invalid order status',
    code : 107
  

  },
  INVALID_ORDER_PAYMENT_STATUS: {
    message: 'Invalid order payment status',
    code : 108
  },
  INVALID_ORDER_PAYMENT_METHOD: {
    message: 'Invalid order payment method',
    code : 109
  },
  INVALID_ORDER_STATUS_UPDATE: {
    message: 'Invalid order status update',
    code : 110
  },
  INVALID_ORDER_PAYMENT_STATUS_UPDATE: {
    message: 'Invalid order payment status update',
    code : 111
  },
  INVALID_ORDER_PAYMENT_METHOD_UPDATE: {
    message: 'Invalid order payment method update',
    code : 112
  },
  INVALID_ORDER_UPDATE: {
    message: 'Invalid order update',
    code : 113
  },
  INVALID_ORDER_DELETE: {
    message: 'Invalid order delete',
    code : 114
  },
  INVALID_ORDER_CREATE: {
    message: 'Invalid order create',
    code : 115
  },
  INVALID_ORDER_PAYMENT: {
    message: 'Invalid order payment',
    code : 116
  },
  INVALID_ORDER_PAYMENT: {
    message: 'Invalid order payment',
    code : 117
  }
};
