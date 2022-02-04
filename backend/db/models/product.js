const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    discription: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    offers: {
        type: Number
    },
    productPictures: [{
        img: {
            type: String
        }
    }],
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        review: String
    }],
    category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'

    },
    updatedAt: Date

}, {
    timestamps: true
});


const products = mongoose.model('Product', productSchema);

module.exports = products