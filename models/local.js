const ObjectId = require('mongodb').ObjectID;
const { dbs } = require('../dbs/locals')

/**
 * Sample LocalTag object
 *  {
 *    pCode: "40", // province code
 *    dCode: "421", // district code
 *    wCode: "912"  // wards code
 *  }
 * 
 *  Sample FullLocalTag object
 *   {
 *     p: {}, // province local object
 *     d: {}, // district local object
 *     w: {},  // wards local object
 *     pCode: "40",
 *     dCode: "421",
 *     wCode: "912"
 *   }
 */

/**
 * By using this model, you can
 * => get base local tree from a local node
 * => get full local tree from a local node
 * => get detail of a local (province, district, wards)
 * => get base child local of a local
 * => get detail child local of a local
 * => get DetailLocalTag by LocalTag
 * 
 * Base result: Display name & code
 * Full result: whole fields
 */

 /** refactor local tree in database */
exports.refactorTree = async() => {

}

/** Get local tree from given local node */
exports.getTree = async(type, code, returnBaseResult = true) => {

}

/** Get a local (not including childs) */
exports.geLocalNonChilds = async(type, code, returnBaseResult = true) => {

}

/** Get detail of a local (including childs if any) */
exports.getLocalWithChilds = async(type, code, returnBaseResult = true) => {

}

/* Get valid local tag by local tag field */
exports.getLocalTag = async(pCode, dCode, wCode, returnBaseResult = false) => {

}

/* Get valid full local tag by given local tag */
exports.getFullLocalTag = async(localTag) => {

}

/* Check if a local tag contains another */
exports.localContains = async(parentLocalTag, childLocalTag) => {

}

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

exports.wardsOfDistrictCode = async (districtCode) => {

}

