const mongoose = require('mongoose');
const Schema  = mongoose.Schema
const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        thumbnail:{
            type: String,
            default:null
        },
        description:{
            type: String,
            default:null
        },
        status :{
            type:Boolean,
            default:false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
