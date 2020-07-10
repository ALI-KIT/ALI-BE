require('lodash');
const axios = require("axios");
const cheerio = require("cheerio");
const Post = require("./models/post")
require('./Mongodb')
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
    $('div.timeline div.story a.cache').each((i, e) => {
        sites.push(root_site + $(e).attr('href'));
    });
    const result = await Promise.all(sites.map(async site => await getContentPage(site)))
    return result
}

const getContentPage = async url => {
    const $ = await fetchHtmlFromUrl(url);

    const Title = $('h1.article__header').text()
    const Dated = new Date($('div.article__meta time').attr('datetime'))
    const Category = $('div.breadcrumb a.cate').text()
    const Summary = $('div.article__sapo').text()
    const Content = $('div.article__body').html()
    const Auth = $('p.body-author').text()
    const Site = root_site
    const Url = url
    const Source = $('p.bm-source a').attr('href');
    return {
        Title,
        Dated,
        Category,
        Summary,
        Content,
        Auth,
        Site,
        Url,
        Source
    }
}

const run = async () => {
    var data = await scrawl('https://baomoi.com' + '/tin-moi/trang1.epi')
    Post.insertMany(data).then(res => {
        console.log(res.length);
    }).catch(err => {
        console.log(err);
    })
}

// run()