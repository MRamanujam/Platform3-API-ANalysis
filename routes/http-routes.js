
var API = require('../modules/api');

var Routes = function (app) {

    this.app = app;
    this.init();
    this.api = new API(app);
    this.api.init();

};
module.exports = Routes;


Routes.prototype.init = function () {

    var self = this;

    var sessionCheck = function (req, res, next) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            next();
        } else {
            res.redirect('/login');
        }
    };


    self.app.get('/',function (req, res) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            req.session.userObj = JSON.parse(userObj);

            res.redirect('/home');

        } else {
            res.render('login.html', {layout: false, boodskap:self.app.boodskap});
        }
    });


    self.app.get('/getfileapi', function (req, res) {
        self.api.getApiList(req,res);
    });



    self.app.get('/login', function (req, res) {
        var userObj = req.cookies['session_obj'];
        if (userObj) {
            res.redirect('/home');
        } else {
            res.render('login.html', {layout: false, boodskap:self.app.boodskap});
        }
    });

    self.app.get('/home', sessionCheck, function (req, res) {
        res.render('home.html', {layout: '', boodskap:self.app.boodskap});
    });

    self.app.get('/message-definition', sessionCheck, function (req, res) {
        res.render('message-definition.html', {layout: '', boodskap:self.app.boodskap});
    });


    self.app.get('/documentation', sessionCheck, function (req, res) {
        res.render('documentation.html', {layout: '', boodskap:self.app.boodskap});
    });

    self.app.get('/asset-api', sessionCheck, function (req, res) {
        res.render('test-asset-api.html', {layout: '', boodskap:self.app.boodskap});
    });

    self.app.get('/device-api', sessionCheck, function (req, res) {
        res.render('test-device-api.html', {layout: '', boodskap:self.app.boodskap});
    });

    self.app.get('/domain-api', sessionCheck, function (req, res) {
        res.render('test-domain-api.html', {layout: '', boodskap:self.app.boodskap});
    });

    self.app.get('/alexa-api', sessionCheck, function (req, res) {
        res.render('test-alexa-api.html', {layout: '', boodskap:self.app.boodskap});
    });

    self.app.get('/brules-api', sessionCheck, function (req, res) {
        res.render('test-brules-api.html', {layout: '', boodskap:self.app.boodskap});
    });

    self.app.get('/nrules-api', sessionCheck, function (req, res) {
        res.render('test-nrules-api.html', {layout: '', boodskap:self.app.boodskap});
    });

    self.app.get('/drules-api', sessionCheck, function (req, res) {
        res.render('test-drules-api.html', {layout: '', boodskap:self.app.boodskap});
    });
    
    self.app.get('/groovy-api', sessionCheck, function (req, res) {
        res.render('test-groovy-api.html', {layout: '', boodskap:self.app.boodskap});
    });
        
    self.app.get('/push-api', sessionCheck, function (req, res) {
        res.render('test-push-api.html', {layout: '', boodskap:self.app.boodskap});
    });
        
    self.app.get('/rules-api', sessionCheck, function (req, res) {
        res.render('test-rules-api.html', {layout: '', boodskap:self.app.boodskap});
    });
        
    self.app.get('/system-api', sessionCheck, function (req, res) {
        res.render('test-system-api.html', {layout: '', boodskap:self.app.boodskap});
    });
};

