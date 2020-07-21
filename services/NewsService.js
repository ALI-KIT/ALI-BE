const News = require('../models/news')
//exports.createHero
module.exports = {
    create: (data) => News.create(data),
    get: (id) => News.findOne(id),
    getAll: () => News.find({}).select("title summary author thumbnail"),
    getAll: (limit, skip) => News.find({}).skip(skip).limit(limit).select("title summary author thumbnail"),
    getMaxNewsAndMaxPage: (limit) => new Promise((resolve, reject) => {
        News.find({}).countDocuments((err, count) => {
            if (err) reject(err)
            else {
                const maxItem = count
                const maxPage = Math.ceil(maxItem / limit)
                resolve({ maxItem, maxPage })
            }
        })
    }),
    findAll: (condition) => News.find(condition),
    findOne: (condition) => News.findOne(condition),

    findAllWithCondition: (condition) => News.find(condition).select("title summary author thumbnail"),
    findAllWithCondition: (condition, limit, skip) => News.find(condition).skip(skip).limit(limit).select("title summary author thumbnail"),
    getMaxNewsAndMaxPageWithCondition: async (condition,limit) => {
        const maxItem = await News.find(condition).countDocuments()
        const maxPage = Math.ceil(maxItem / limit)
        return { maxItem, maxPage }
    },

    update: (id, data) => {

    },
    delete: (id) => {

    },

}