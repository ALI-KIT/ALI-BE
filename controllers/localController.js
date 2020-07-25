const locals = require('../models/local');

exports.home = async (req, res, next) => {
    try {
        const data = await locals.provinces() || { error: "¯\_(ツ)_/¯" };
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}