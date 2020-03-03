const Accounts = require('./app/controllers/accounts');
const Pois = require('./app/controllers/pois');
const Gallery = require('./app/controllers/gallery');

module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/create', config: Pois.showCreate },
    { method: 'GET', path: '/poi', config: Pois.poi },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'GET', path: '/gallery', config: Accounts.showGallery },
    { method: 'GET', path: '/poireport', config: Pois.report },
    { method: 'GET', path: '/deleteimage/{id}', config: Gallery.deleteImage},
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/create', config: Pois.create },
    { method: 'POST', path: '/uploadfile', config: Gallery.uploadFile },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },

    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: { auth: false }
    }

];