const ObjectId = require('mongodb').ObjectID;
const { dbs } = require('../dbs/locals')

exports.provinces = async() => {
    const result = await dbs.production.collection('tinh-thanh').find({}).toArray();
    return result;
}

exports.districts = async() => {
    const result = await dbs.production.collection('quan-huyen').find({}).toArray();
    return result;
}

exports.districtsOfProvince = async(province) => {
    if(!province || !province.code) return {};
    return await this.districtsOfProvinceCode(province.code);
}

exports.districtsOfProvinceCode = async(provinceCode) => {
    if(!provinceCode) return {};

    const query = {};
    query.code = provinceCode;
    return await dbs.collection('quan-huyen').find(query).toArray();
}