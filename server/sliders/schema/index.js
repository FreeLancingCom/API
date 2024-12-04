import mongoose from 'mongoose';
import {STATUS,INTEGRATION_TYPES} from '../helpers/constants.js';


const sliderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        integration_type:{
            type: String,
            enum : Object.keys(INTEGRATION_TYPES),
            required: true
        },
        image: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: Object.keys(STATUS),
            default: STATUS['ACTIVE']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
)


export default mongoose.model('Slider', sliderSchema);
