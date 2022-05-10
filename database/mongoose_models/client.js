var mongoose = require('mongoose');

//Client Schema and validations
var client = new mongoose.Schema({
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
    },
    DOB: {
        type: String,
        required: true,
    },
    Parent: {
        type: String,
        required: function () { // validate to require parent if the age is below 18
            var today = new Date();
            var birthDate = new Date(this.DOB);
            var age = today.getFullYear() - birthDate.getFullYear();
            return age < 18;
        }
    },
    ContactPermission: {
        type: String,
        required: true,
        enum: ['Y', 'N']
    },
    Gender: {
        type: String,
        required: true,
    },
    MaritalStatus: {
        type: String,
        required: true,
        enum: ['Never Married', 'Domestic Partnership', 'Married', 'Separated', 'Divorced', 'Widowed']
    },
    Referrer: {
        type: String,
    },
    RecordDate: {
        type: Date,
        default: Date.now // send current date to db
    },
});

module.exports = mongoose.model('Client', client);
