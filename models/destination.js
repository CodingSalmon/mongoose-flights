const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    airport: {type: String, unique: true},
})

module.exports = mongoose.model('Destination', destinationSchema)