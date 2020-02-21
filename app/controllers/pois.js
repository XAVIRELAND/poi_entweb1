const Pois = {
    poi: {
        auth: false,
        handler: function(request, h) {
            return h.view('poi', { title: 'Welcome to Lighthouses' });
        }
    },

    showCreate: {
        auth: false,
        handler: function(request, h) {
            return h.view('create', { title: 'Login to create' });
        }
    },
    report: {
        auth: false,
        handler: function(request, h) {
            return h.view('poireport', { title: ' my created poi', pois: this.pois });
        }
    },
    create: {
        auth: false,
        handler: function(request, h) {
            const data = request.payload;
            var creatorEmail = request.auth.credentials.id;
            data.creator = this.users[creatorEmail];
            return h.redirect('/poireport');
        }
    },

};

module.exports = Pois;