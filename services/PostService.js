const Post = require('../models/post')
//exports.createHero
module.exports = {
    create: (data, callback) => Post.create(data, callback),
    get: (id, callback) => Post.findOne(id, callback),
    getAll: (callback) => Post.find({}, callback),
    findAll: (condition, callback) => Post.find(condition, callback),
    update: (id, data, callback) => {

    },
    delete: (id, callback) => {

    },

}