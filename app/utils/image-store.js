'use strict';

const cloudinary = require('cloudinary').v2;

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const ImageStore = {
    configure: function() {
        const credentials = {
            cloud_name: process.env.name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
        };
        cloudinary.config(credentials);
    },

    getAllImages: async function() {
        const result = await cloudinary.api.resources();
        return result.resources;
    },

    uploadImage: async function(imagefile) {
        await writeFile('./public/temp.img', imagefile);
        await cloudinary.uploader.upload('./public/temp.img');
    },

    deleteImage: async function(id) {
        await cloudinary.uploader.destroy(id, {});
    },

};

module.exports = ImageStore;