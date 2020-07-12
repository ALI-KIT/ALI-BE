const News = require('../models/place')
//exports.createHero
module.exports = {
    create: (data) => News.create(data),
    get: (id) => News.findById(id),
    findOne: (condition) => News.findOne(condition),
    findAll: (condition) => News.find(condition),
    getAll: () => News.find({})

}
