const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    date:{
        type: String,
        required:true,
        default:Date.now()
    }
});

module.exports = mongoose.model('Product', productSchema);
