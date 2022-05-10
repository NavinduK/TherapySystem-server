var express = require('express');
var router = express.Router();
var TherapySession = require('../models/therapysession.model');

//Get all therapy sessions
router.get('/', function (req, res) {
    TherapySession.find({}, (err, therapysession) => {
        // return error with status code 500 or response with 200
        if (err) { return res.status(500).json(
            { msg: 'ERROR_FETCH_THERAPYSESSIONS', data: err }); }
        return res.status(200).json(
            { msg: "FETCHED_THERAPYSESSIONS", data: therapysession });
    });
});

// create a therapy session
router.post('/create', function (req, res) {
    var therapysession = new TherapySession(req.body);
    
    therapysession.save(function (err, therapysession) {
        // return error with status code 500 or response with 200
        if (err) return res.status(500).json(
            { msg: 'ERROR_ADD_THERAPYSESSIONS', data: err });
        return res.status(200).json(
            { msg: 'ADDED_THERAPYSESSIONS', data: therapysession });
    });
});

//Update a therapy session
router.put('/update/:id', function (req, res) {
    TherapySession.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { new: true },
        function (err, therapysession) {
            // return error with status code 500 or response with 200
            if (err) return res.status(500).json(
                { msg: 'ERROR_UPDATE_THERAPYSESSIONS', data: err });
            return res.status(200).json(
                { msg: 'UPDATED_THERAPYSESSIONS', data: therapysession });
        });
});

//Delete a therapy session
router.delete('/delete/:id', function (req, res) {
    TherapySession.findOneAndDelete({ _id: req.params.id },
        function (err, therapysession) {
            // return error with status code 500 or response with 200
            if (err) return res.status(500).json(
                { msg: 'ERROR_DELETE_THERAPYSESSIONS', data: err });
            return res.status(200).json(
                { msg: 'DELETED_THERAPYSESSIONS', data: therapysession });
        });
});
module.exports = router;