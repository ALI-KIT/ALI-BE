let express = require('express');
let router = express.Router();
let NewsService = require('../services/NewsService')
let PlaceService = require('../services/PlaceService')
let mongoose = require('mongoose')

router.get('/', (res, req, next) => {
    NewsService.getAll((err, data) => {
        if (err) {
            console.log(err)
            req.status(500).send({ error: err })
        }
        req.status(200).json(data)
    })
})

router.get('/quan9', (res, req, next) => {
    NewsService.getAll((err, data) => {
        if (err) {
            console.log(err)
            req.status(500).send({ error: err })
        }
        const id = mongoose.Types.ObjectId('5f0ae0263a55493258285092');
        PlaceService.get(id, (err, d2) => {
            if (err) {
                console.log(err)
                req.status(500).send({ error: err })
            }
            // console.log(data);
            console.log(d2);
            const { regex, flat } = d2
            var result = data.filter(e => IsCorrectCondition(e, RegExp(regex, flat)))
            req.status(200).json(result)
        })
    })
})

router.get('/regex', (res, req, next) => {
    const id = mongoose.Types.ObjectId('5f0ae0263a55493258285092');
    PlaceService.get(id, (err, data) => {
        if (err) {
            console.log(err)
            req.status(500).send({ error: err })
        }
        req.status(200).json(data)
    })
})
// const regex = RegExp("\b(qu[ậa]n 9)\b",iu)

// const strings={
//     a: "aa quận 0 is live ",
//     b: "is love",
//     c: "is a God"
// }

// let rs=false
// for (const i in strings) {
//     if(regex.test(i))
//     {
//         rs=true;
//         break
//     }
// }

const IsCorrectCondition = (obj, regex) => {
    for (const e in obj) {
        if (regex.test([obj[e]])) {
            return true;
        }
    }
    return false
}

module.exports = router