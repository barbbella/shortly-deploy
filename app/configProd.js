var mongo = require('mongodb');

var app = express.createServer();

var usersCollection = null;
var urlsCollection = null;

var server = new mongo.Server('127.0.0.1', 27017, {auto_reconnect: true});

var db = new Db('shortly', server);
db.open(function(err, connection) {
  connection.createCollection('users', function(err, collection) {
    if (!err) {
      usersCollection = collection;
    }
  });
  connection.createCollection('urls', function(err, collection) {
    if (!err) {
      urlsCollection = collection;
    }
  });
  app.listen(4568);
});

// connection and collection creation
module.exports = mongo;