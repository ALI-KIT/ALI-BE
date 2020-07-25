const MongoClient = require('mongodb').MongoClient;

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
// Connection URL
const defaultDb='locals';
const defaultConfig = '?retryWrites=true';

// Connection String
const PROD_URI = 'mongodb+srv://user1:123455@ali-db.gyx2c.gcp.mongodb.net/'+defaultDb + defaultConfig;

var dbs = {production: {}};
function connect(url) {
    return MongoClient.connect(url, {useNewUrlParser: true}).then(client => client.db())
}

exports.initdb = async function() {
    let database = await connect(PROD_URI);
    dbs.production = database;
};

exports.dbs = dbs;