var mongoose = require('mongoose');

CUSTOMERCONNSTR_MONGOLAB_URI = 'mongodb://shortlyAdmin:shortadmin@ds045097.mongolab.com:45097/shortlyjs';
mongoURI = process.env.CUSTOMERCONNSTR_MONGOLAB_URI || 'mongodb://localhost/shortlydb';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   console.log('Mongodb connection open');
});

module.exports = db;




