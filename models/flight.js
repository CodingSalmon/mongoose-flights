const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    seat: {
        type: String, 
        match: /[A-F][1-9]\d?/
    },
    price: {
        type: Number, 
        min: 0
    },
});

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United'],
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN',
    },
    flightNo: {
        type: Number,
        require: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            const date = new Date();
            return date.setFullYear(date.getFullYear() + 1);
        },
    },
    tickets: [ticketSchema],
    destinations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Destination'}],
});

module.exports = mongoose.model('Flight', flightSchema);