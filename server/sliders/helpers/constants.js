export const CONTROLLERS = {
    LIST_SLIDERS: 'listSliders',
    GET_SLIDER: 'getSlider',
    CREATE_SLIDER: 'createSlider',
    UPDATE_SLIDER: 'updateSlider',
    DELETE_SLIDER: 'deleteSlider',
    
}



export const STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
}
export const INTEGRATION_TYPES = {
    PRODUCT: 'PRODUCT',
    PACKAGE: 'PACKAGE',
    URL: 'URL'
}

export const slidersErrors = Object.freeze({
    SLIDER_NOT_FOUND: {
        code: 404,
        message: 'Slider was not found'
    },
    SLIDER_ALREADY_EXISTS: {
        code: 101,
        message: 'Slider already exists'
    },
    SLIDER_CREATION_FAILED: {
        code: 102,
        message: 'Slider creation failed'
    },
    SLIDER_UPDATE_FAILED: {
        code: 103,
        message: 'Slider update failed'
    },
    SLIDER_DELETE_FAILED: {
        code: 104,
        message: 'Slider delete failed'
    }
})