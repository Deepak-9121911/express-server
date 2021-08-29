const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },

    age: {
    type: Number
    },

    isGraduated: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: Date.now
    },
    hobbies: Array,
    car: {
        type: String
    }
})

module.exports = mongoose.model('User',userSchema);