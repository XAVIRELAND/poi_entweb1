const Accounts = {

    index: {
            auth: false,
            handler: function(request, h) {
                return h.view('home', { title: 'Welcome to Donations' });
            }
        },

    showSignup: {
        auth: false,
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Lighthouses' });
        }
    },

    showLogin: {
        auth: false,
        handler: function(request, h) {
            return h.view('/', { title: 'Login to poi' });
        }
    },
    login: {
        auth: false,
        handler: function(request, h) {
            const user = request.payload;
            if ((user.email in this.users) && (user.password === this.users[user.email].password)) {
                request.cookieAuth.set({ id: user.email });
                return h.redirect('/poi');
            }
            return h.redirect('/');
        }
    },
    signup: {
        auth: false,
        handler: function(request, h) {
            const user = request.payload;
            this.users[user.email] = user;
            request.cookieAuth.set({ id: user.email });
            return h.redirect('/home');
        }
    },



};

module.exports = Accounts;