const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    cartItem: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
                unique:true
            },
            quantity:{
                type: Number,
                default:1
            }
            // ,
            // price:{
            //     type: Number,
            //     required: true
            // }
        }
    ]
}, {
    timestamps: true
});


const categorys = mongoose.model('cart', cartSchema);

module.exports = categorys