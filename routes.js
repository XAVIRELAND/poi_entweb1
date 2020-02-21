const Accounts = require('./app/controllers/accounts');
const Pois = require('./app/controllers/pois');

module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/create', config: Pois.showCreate },
    { method: 'GET', path: '/poi', config: Pois.poi },

    { method: 'POST', path: '/', config: Accounts.login },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/create', config: Pois.create },
    { method: 'GET', path: '/poireport', config: Pois.report },
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