'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    county: String,
    year: Number,
    height: Number,
    focalHeight: Number,
    range: Number,
    url: String,
    info: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
poiSchema.statics.findById = function(_id) {
    return this.findOne({ _id : _id});
};


module.exports = Mongoose.model('poi', poiSchema);
