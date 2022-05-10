var express = require('express');
var router = express.Router();
var Therapist = require('../models/therapist.model');

//Get all therapists
router.get('/', function (req, res) {
    Therapist.find({}, (err, therapists) => {
        // return error with status code 500 or response with 200
        if (err) { return res.status(500).json(
            { msg: 'ERROR_FETCH_THERAPISTS', data: err }); }
        return res.status(200).json(
            { msg: "FETCHED_THERAPISTS", data: therapists });
    });
});

// create a therapists
router.post('/create', function (req, res) {
    var therapist = new Therapist(req.body);

    therapist.save(function (err, therapist) {
        // return error with status code 500 or response with 200
        if (err) return res.status(500).json(
            { msg: 'ERROR_ADD_THERAPISTS', data: err });
        return res.status(200).json(
            { msg: 'ADDED_THERAPISTS', data: therapist });
    });
});

//Update a therapists
router.put('/update/:id', function (req, res) {
    Therapist.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { new: true },
        function (err, therapist) {
            // return error with status code 500 or response with 200
            if (err) return res.status(500).json(
                { msg: 'ERROR_UPDATE_THERAPIST', data: err });
            return res.status(200).json(
                { msg: 'UPDATED_THERAPIST', data: therapist });
        });
});

//Delete a therapists
router.delete('/delete/:id', function (req, res) {
    Therapist.findOneAndDelete({ _id: req.params.id },
        function (err, therapist) {
            // return error with status code 500 or response with 200
            if (err) return res.status(500).json(
                { msg: 'ERROR_DELETE_THERAPIST', data: err });
            return res.status(200).json(
                { msg: 'DELETED_THERAPIST', data: therapist });
        });
});

module.exports = router;