const News = require('../models/news')
//exports.createHero
module.exports = {
    create: (data, callback) => News.create(data, callback),
    get: (id, callback) => News.findOne(id, callback),
    getAll: (callback) => News.find({}, callback),
    findAll: (condition, callback) => News.find(condition, callback),
    update: (id, data, callback) => {

    },
    delete: (id, callback) => {

    },

}