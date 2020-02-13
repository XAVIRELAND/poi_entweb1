const Pois = require('./app/controllers/pois');

module.exports = [{ method: 'GET', path: '/', config: Pois.index }];