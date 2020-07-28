require('lodash');
const axios = require("axios");
const cheerio = require("cheerio");
const News = require("./models/news");
const { Mongoose } = require('mongoose');
const unidecode = require('unidecode');
// require('./Mongodb')
const root_site = "https://baomoi.com"

const sendResponse = res => async request => {
    return await request
        .then(data => res.json({ status: "success", data }))
        .catch(({ status: code = 500 }) =>
            res.status(code).json({ status: "failure", code, message: code == 404 ? 'Not found.' : 'Request failed.' })
        );
};

const fetchHtmlFromUrl = async url => {
    return await axios
        .get(url)
        .then(response => cheerio.load(response.data, { decodeEntities: false }))
        .catch(error => {
            error.status = (error.response && error.response.status) || 500;
            throw error;
        });
}

// fetchHtmlFromUrl(site)
//     .then($ => {
//         fruits = []

//         $('div.timeline div.story a.cache').each((i, e) => {
//             fruits.push(site + $(e).attr('href'));
//         });
//         return fruits
//     })

const scrawl = async url => {
    const $ = await fetchHtmlFromUrl(url);
    const sites = [];
    $('div.timeline div.story:not(.story--video,.story--photo,.wait-render) a.cache').each((i, e) => {
        sites.push(root_site + $(e).attr('href'));
    });
    const result = await Promise.all(sites.map(async site => await getContentPage(site)))
    return result
}

const getContentPage = async url => {
    const $ = await fetchHtmlFromUrl(url);

    title = $('h1.article__header').text()
    dated = new Date($('div.article__meta time').attr('datetime'))
    category = $('div.breadcrumb a.cate').first().text()
    summary = $('div.article__sapo').text()
    content = $('div.article__body').html()
    auth = $('p.body-author').text()
    site = root_site
    source = $('p.bm-source a').attr('href');
    thumbnail= $('div.article p.body-image img').first().attr('src')
    return {
        title,
        dated,
        category,
        summary,
        content,
        auth,
        site,
        url,
        source,
        thumbnail
    }
}

const run = async () => {
    var data = await scrawl('https://baomoi.com' + '/tin-moi/trang1.epi')
    News.insertMany(data).then(res => {
        console.log(res.length);
    }).catch(err => {
        console.log(err);
    })
}

// run()

const runtest = () => {
    var data = {title:"Q.9 is love",
summary:"tang nhon phu a, quan 9 is my life",
content:"dit me quan 9",
url:"url",
source:"source"}
    const keywords=["Q.9", "Quận 9", "Tăng Nhơn Phú A"]
    const flat ='ui'
    const regexs= keywords.map(key=>({
        keyword: key,
        regex: RegExp(StringToRegex(key),flat)
    }))
    const tags= regexs.filter(r=>r.regex.test(data.summary)).map(r=>r.keyword)
    // let text = data.summary
    // let result = regex.exec(data.summary)
    console.log(tags);


}

const StringToRegex=(str)=>{
    const text=str.trim().toLowerCase()
    const textAscii= unidecode(text)
    return '\\b'+text.split("").reduce((pre, cur, i) => pre + (textAscii.includes(cur) ? cur : `[${textAscii[i]}${cur}]`))+'\\b'
}

runtest()

// Mongoose.connection.open()

module.exports={
    fetchHtmlFromUrl,
    sendResponse
}