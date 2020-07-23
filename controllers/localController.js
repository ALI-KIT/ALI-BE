const locals = require('../models/local');
const { reset } = require('nodemon');

exports.home = async (req, res, next) => {
 return await this.findByCode(req, res, next);   
}

/* find a local or get all with provided local code*/
exports.findByCode = async (req, res, next) => {
    const type = req.query.type || 'tinh-thanh';
    const code = req.query.code || 'all';

    try {
        const data = await locals.provinces() || { error: "¯\_(ツ)_/¯" };
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

function sendResult(res, code, message, data) {
    if(!message || message==='') {
    try {
        res.status(code).send(data)
    } catch(error) {
        res.status(500).send({error: error.message})
    }}
     else res.status(code).send({error: message, code: code})
}

/* find all local childs from provided local parent code*/
export.findChildsByCode = async (req, res, next) => {
    const type = (req.query.type === 'tinh-thanh' || req.query.type ==='quan-huyen') ? req.query.type : undefined;
    const code = req.query.code
    
    if(!type) 
        sendResult(500, 'Invalid params. Field type must be \'tinh-thanh\' or \'quan-huyen\'');
    else if(!code)
        sendResult(500, 'Invalid params. Field code is undefined');
    else if(type == 'tinh-thanh') 
    sendResult(200, '', await locals.districtsOfProvinceCode(code));
    else if( type == 'quan-huyen')
    sendResult(200, await locals.)

    if(message==='') try {
        data = (type === 'tinh-thanh') ? await locals.districtsOfProvinceCode(code)
    } catch
    
}