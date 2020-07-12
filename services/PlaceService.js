const News = require('../models/place')
//exports.createHero
module.exports = {
    create: (data, callback) => News.create(data, callback),
    get: (id, callback) => News.findOne(id, callback),
}
