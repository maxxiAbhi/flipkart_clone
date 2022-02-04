const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        required: true,
        trim: true
    },
    banners: [
        {
            img: { type: String },
            navigateTo: { type: String }
        }
    ],
    products:[
        {
            img: { type: String },
            navigateTo: { type: String }
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
        unique:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {
    timestamps: true
});


const pages = mongoose.model('page', pageSchema);
module.exports = pages