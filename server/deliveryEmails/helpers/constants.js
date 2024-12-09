export const CONTROLLERS = {
    LIST_DELIVERY_EMAILS: 'listDeliveryEmails',
    GET_DELIVERY_EMAIL: 'getDeliveryEmail',
    CREATE_DELIVERY_EMAIL: 'createDeliveryEmail',
    UPDATE_DELIVERY_EMAIL: 'updateDeliveryEmail',
    DELETE_DELIVERY_EMAIL: 'deleteDeliveryEmail',

}

export const deliveryEmailsErrors = Object.freeze({
    DELIVERY_EMAIL_NOT_FOUND: {
        code: 404,
        message: 'Delivery Email was not found'
    },
    DELIVERY_EMAIL_ALREADY_EXISTS: {
        code: 101,
        message: 'Delivery Email already exists'
    },
    DELIVERY_EMAIL_CREATION_FAILED: {
        code: 102,
        message: 'Delivery Email creation failed'
    },
    DELIVERY_EMAIL_UPDATE_FAILED: {
        code: 103,
        message: 'Delivery Email update failed'
    },
    DELIVERY_EMAIL_DELETE_FAILED: {
        code: 104,
        message: 'Delivery Email delete failed'
    }
})