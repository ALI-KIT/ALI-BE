require('lodash');
const Place = require('../models/place');
const { Mongoose } = require('mongoose');
const { fetchHtmlFromUrl } = require('../crawlData');
var unidecode = require('unidecode');
require('../Mongodb')

const run = async () => {
    let data = {
        name: "Quận 9",
        keywords: [],
        regex: ''
    }
    const url = "https://vi.wikipedia.org/wiki/Th%E1%BB%83_lo%E1%BA%A1i:Ph%C6%B0%E1%BB%9Dng_thu%E1%BB%99c_Qu%E1%BA%ADn_9"

    const $ = await fetchHtmlFromUrl(url);//cai nay de lay het html thoi

    //RegExp("\b(qu[ậa]n 9)\b",iu)
    //quận 9
    //cai đống này là để lấy regex
    data.regex += '\\b('
    $('div.mw-content-ltr>div.mw-category li a').each((i, e) => {
        const text = $(e).text().split(/\s*(?:[;.,\(\)]|$)\s*/)[0].toLowerCase()
        const textAscii = unidecode(text);
        const rs = '(' + text.split("").reduce((pre, cur, i) => pre + (textAscii.includes(cur) ? cur : `[${textAscii[i]}${cur}]`)) + ')';
        data.regex += rs + '|'
        data.keywords.push(text)
    })
    data.regex = data.regex.substr(0,data.regex.length-1)+')\\b'

    // console.log(data.regex);
    Place.create(data).then(res => console.log(res)).catch(err => console.log(err))
}


run();
// const text = "Nguyễn Minh Trường".trim().toLowerCase()
// const textAscii = unidecode(text);
// const rs = '(' + text.split("").reduce((pre, cur, i) => pre + (textAscii.includes(cur) ? cur : `[${textAscii[i]}${cur}]`)) + ')';
// console.log(rs);