let express = require('express');
let router = express.Router();
let postService = require('../services/PostService')

router.get('/', (res, req, next) => {
    postService.getAll((err,data)=>{
        if(err) {
            console.log(err)
            req.status(500).send({error: err})
        }
        req.status(200).json(data)
    })
})

module.exports = router