const Poi = require('../models/poi');
const User = require('../models/user');

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
    }

};

module.exports = Pois;