var express = require('express');
var router = express.Router();
var Client = require('../models/client.model');

//Get all clients
router.get('/', function (req, res) {
    Client.find({}, (err, clients) => {
        // return error with status code 500 or response with 200
        if (err) { return res.status(500).json(
            { msg: 'ERROR_FETCH_CLIENTS', data: err }); }
        return res.status(200).json(
            { msg: "FETCHED_CLIENTS", data: clients });
    });
});

// create a client
router.post('/create', function (req, res) {
    var client = new Client(req.body);

    client.save(function (err, client) {
        // return error with status code 500 or response with 200
        if (err) return res.status(500).json(
            { msg: 'ERROR_ADD_CLIENTS', data: err });
        return res.status(200).json(
            {msg: 'ADDED_CLIENTS', data: client });
    });
});

//Update a client
router.put('/update/:id', function (req, res) {
    Client.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { new: true },
        function (err, client) {
            // return error with status code 500 or response with 200
            if (err) return res.status(500).json(
                { msg: 'ERROR_UPDATE_CLIENT', data: err });
            return res.status(200).json(
                { msg: 'UPDATED_CLIENT', data: client });
        });
});

//Delete a client
router.delete('/delete/:id', function (req, res) {
    Client.findOneAndDelete({ _id: req.params.id },
        function (err, client) {
            // return error with status code 500 or response with 200
            if (err) return res.status(500).json(
                { msg: 'ERROR_DELETE_CLIENT', data: err });
            return res.status(200).json(
                { msg: 'DELETED_CLIENT', data: client });
        });
});

module.exports = router;