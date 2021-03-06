const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);
