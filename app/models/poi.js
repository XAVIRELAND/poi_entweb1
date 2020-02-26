'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    county: String,
    description: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Mongoose.model('poi', poiSchema);
