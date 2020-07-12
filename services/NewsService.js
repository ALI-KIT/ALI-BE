const News = require('../models/news')
//exports.createHero
module.exports = {
    create: (data) => News.create(data),
    get: (id) => News.findOne(id),
    getAll: () => News.find({}),
    findAll: (condition) => News.find(condition),
    findOne: (condition) => News.findOne(condition),
    update: (id, data) => {

    },
    delete: (id) => {

    },

}