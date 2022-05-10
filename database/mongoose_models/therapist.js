var mongoose = require('mongoose');

//therapist Schema and validations
var therapist = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        enum: ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Prof'],
    },
    FirstName: {
        type: String,
        required: true,
    },
    Surname: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        validate: [{ // validate email format 
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            }, message: "Please enter a valid email address."
        }]
    },
    Address: {
        Address1: { type: String, required: true },
        Address2: { type: String },
        Town: { type: String, required: true },
        Country: { type: String, required: true },
        EIRCODE: { type: String }
    }
});

module.exports = mongoose.model('Therapist', therapist);
