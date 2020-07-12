let express = require('express');
let router = express.Router();
let NewsService = require('../services/NewsService')
let PlaceService = require('../services/PlaceService')
let mongoose = require('mongoose');
const unidecode = require('unidecode');

router.get('/', async (res, req, next) => {
    const place = unidecode(res.query.location).trim().toLowerCase() || "all"
    let result = {error:"¯\_(ツ)_/¯"};
    try {
        switch (place) {
            case "quan 9":
                const id = mongoose.Types.ObjectId('5f0ae0263a55493258285092');
                const place = await PlaceService.get(id)
                const { regex, flat } = place
                pattern = RegExp(regex, flat)
                result = await NewsService.findAll({
                    $or: [
                        { "Title": { $regex: pattern } },
                        { "Summary": { $regex: pattern } },
                        { "Content": { $regex: pattern } },
                        { "Category": { $regex: pattern } }
                    ]
                })

                break;
            default:
                result = await NewsService.getAll()
                break;

        }
        req.status(200).json(result);
    } catch (error) {
        console.log(error);
        req.status(500).send(error)
    }
})

router.get('/quan9', async (res, req, next) => {
    try {
        const { news, place } = await Promise.all(NewsService.getAll(), PlaceService.get(id))
        const id = mongoose.Types.ObjectId('5f0ae0263a55493258285092');
        const { regex, flat } = place
        var result = news.filter(e => IsCorrectCondition(e, RegExp(regex, flat)))
        req.status(200).json(result)
    } catch (error) {
        req.status(500).send(error)
    }
})

router.get('/regex', async (res, req, next) => {
    const id = mongoose.Types.ObjectId('5f0ae0263a55493258285092');
    try {
        const data = await PlaceService.get(id)
        req.status(200).json(data);
    } catch (error) {
        console.log(error);
        req.status(500).send(error)
    }
})

const IsCorrectCondition = (obj, regex) => {
    for (const e in obj) {
        if (regex.test([obj[e]])) {
            return true;
        }
    }
    return false
}

module.exports = router