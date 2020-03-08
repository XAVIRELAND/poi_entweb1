const Poi = require('../models/poi');
const User = require('../models/user');
const Joi = require('@hapi/joi');
const Pois = {
    poi: {
        auth: false,
        handler: async function(request, h) {
            const lighthouses = await Poi.aggregate([
                { $group : { _id : "$county", pois: { $push: {name: "$name", _id: "$_id", latitude: "$latitude",
                                longitude: "$longitude"} } } }
                ]);
            const coordinates = await Poi.find({},{ latitude: 1, longitude: 1, name: 1, url: 1, year: 1, height: 1, focalHeight: 1, range: 1, info: 1 }).lean();
            return h.view('poi', {
                title: 'Welcome to Lighthouses',
                lighthouses: lighthouses,
                coordinates: coordinates,
            });
        }
    },

    showCreate: {
        auth: false,
        handler: function(request, h) {
            return h.view('create', { title: 'Login to create' });
        }
    },
    report: {
        handler: async function(request, h) {
            try {
                const pois = await Poi.find().populate('creator').lean();
                return h.view('poireport', {
                    title: 'Pois to Date',
                    pois: pois
                });
            } catch (err) {
                return h.view('poi', { errors: [{ message: err.message }] });
            }
        }
    },
    create: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const newPoi = new Poi({
                    name: data.name,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    county: data.county,
                    year:data.year,
                    height:data.height,
                    focalHeight: data.focalHeight,
                    range:data.range,
                    url: data.url,
                    info: data.info,
                    creator: user._id
                });
                await newPoi.save();
                return h.redirect('/poireport');
            } catch (err) {
                return h.view('create', { errors: [{ message: err.message }] });
            }
        }
    },
    showUpdate: {

        handler: async function(request, h) {
            try {
                const id = request.params._id;
                const pois = await Poi.findById(id).lean();
                return h.view('updatePois', { title: 'Poi Settings', pois: pois });
            } catch (err) {
                return h.view('poi', { errors: [{ message: err.message }] });
            }
        }
    },

    updatePois: {
        handler: async function(request, h) {
            try {
                const poisEdit = request.payload;
                const id = request.params._id;
                const pois = await Poi.findById({id});
                pois.name = poisEdit.name;
                pois.latitude = poisEdit.latitude;
                pois.longitude = poisEdit.longitude;
                pois.county = poisEdit.county;
                pois.url = poisEdit.url;
                pois.year = poisEdit.year;
                pois.height = poisEdit.height;
                pois.focalHeight = poisEdit.focalHeight;
                pois.range = poisEdit.range;
                pois.info = poisEdit.info;

                await pois.save();
                return h.redirect('/updatePois');
            } catch (err) {
                return h.view('updatePois', { errors: [{ message: err.message }] });
            }
        }
    },


    deletePois: {

        handler: async function (request, h) {
            try {
                const id = request.params._id;
                const pois = await Poi.findById(id, function (err, id) {})
                await pois.deleteOne({_id: id});
                return h.redirect('/poireport')
            } catch (err) {
                return h.view('poi', {errors: [{message: err.message}]});
            }
        }
    },

    details: {
        handler: async function(request, h) {
            try {
                const id = request.params._id;
                const poi = await Poi.findById(id, function (err, id) {})
                return h.view('details', {
                    title: 'Lighthouse details',
                    details: poi
                });
            } catch (err) {
                return h.view('details', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = Pois;
