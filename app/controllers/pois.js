const Poi = require('../models/poi');
const User = require('../models/user');
const Joi = require('@hapi/joi');
const Pois = {
    poi: {
        auth: false,
        handler: async function(request, h) {
            const lighthouses = await Poi.aggregate([
                { $group : { _id : "$county", pois: { $push: "$name" } } }
                ]);
            const coordinates = await Poi.find({},{ latitude: 1, longitude: 1}).lean();
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
                    description: data.description,
                    url: data.url,
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
                return h.view('updatePois', { title: 'Poi Settings' });
            } catch (err) {
                return h.view('poi', { errors: [{ message: err.message }] });
            }
        }
    },
    updatePois: {

        handler: async function (request, h) {
            try {

                const poiEdit = request.payload;
                const pois = await Poi.find({});
                pois.name = poiEdit.name;
                pois.latitude = poiEdit.latitude;
                pois.longitude = poiEdit.longitude;
                pois.county = poiEdit.county;
                pois.description = poiEdit.description;
                pois.url = poiEdit.url;
                await pois.save();

                return h.redirect('/poireport');
            } catch (err) {
                return h.view('poi', {errors: [{message: err.message}]});
            }
        }
    },


    deletePois: {

        handler: async function (request, h) {
            try {

                const pois = await Poi.find();
                await pois.deleteOne({"name": pois.name});

                return h.redirect('/poireport');
            } catch (err) {
                return h.view('poi', {errors: [{message: err.message}]});
            }
        }
    }
};

module.exports = Pois;
