var mongoose = require('mongoose');

//Therapy session Schema and validations
var therapysession = new mongoose.Schema({
    Date: {
        type: String,
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
    Client: {
        type: [{
            type: mongoose.Schema.ObjectId, 
            ref: 'Client',
            required: true,
        }],
        validate: [{
            validator: function (c) { // validate max no of client is 3 and min 1
                return c.length <= 3 && c.length >= 1;
            }, message: "No clients or clients are more than 3 for the session"
        }]
    },
    Therapist: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Therapist',
        required: true,
    },
    Fee: {
        type: Number,
        required: true,
    },
    SessionNumber: {
        type: Number,
        required: true
    },
    SessionAttendance: {
        type: String,
        required: true,
        enum: ['Attended', 'Cancelled', 'No Show']
    },
    SessionType: {
        type: String,
        required: true,
        enum: ['Intake', 'Psychotherapy', 'Assessment']
    },
    SessionNotes: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('TherapySession', therapysession);
