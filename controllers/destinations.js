const Destination = require('../models/destination');

module.exports = {
    create,
    new: newDestination,
};

function create(req, res) {
    Destination.create(req.body, function(err, destination) {
        res.redirect(`/destinations/new`);
    });
};

function newDestination(req, res) {
    res.render('destinations/new')
}
