const Flight = require('../models/flight');
const Destination = require('../models/destination')

module.exports = {
    index,
    show,
    new: newFlight,
    create,
    addTicket,
    addDestination,
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {flights});
    });
};

function show(req, res) {
    Flight.findById(req.params.id)
    .populate('destinations').exec(function(err, flight) {
        Destination.find({_id: {$nin: flight.destinations}}, function(err, destsNotInDests) {
            console.log(err)
            res.render('flights/show', {flight, destsNotInDests});
        })
    });
};

function newFlight(req, res) {
    const today = new Date()
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
    res.render('flights/new', {today: today.toISOString().slice(0, -8)});
};

function create(req, res) {
    Flight.create(req.body, function(err) {
        console.log(err)
        res.redirect('/flights');
    });
};

function addTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.tickets.push(req.body)
        flight.save(function(err) {
            console.log(err)
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

function addDestination(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body.airport)
        flight.save(function(err) {
            console.log(err)
            res.redirect(`/flights/${flight._id}`)
        })
    })
}
