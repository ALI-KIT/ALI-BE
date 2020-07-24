const axios = require("axios");
const cheerio = require("cheerio");
const { loadWebSite } = require("../utils/crawlUtils");
const News2Service = require("../services/News2Service");


exports.pretty = async (req, res, next) => {
    res.render('index', { title: 'Welcome to Ali Control Center' });
}

exports.home = async (req, res, next) => {
    result = { data: "nothing" }
    try {
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

exports.beginCrawl = async (req, res, next) => {
    const data = {}

    const base = "https://baomoi.com"
    const tinMoi = base + '/tin-moi/'

    for(let page = 1; page <= 30; page ++) {
        const url = tinMoi +'trang'+page +".epi?loadmore=1"
        const $ = await loadWebSite(url)
        const sites = []

        $('div.story:not(.story--video,.story--photo,.wait-render) a.cache').each((i, e) => {
            sites.push(base + $(e).attr('href'));
        });
    
        const contents = await Promise.all(sites.map(async detailUrl => await getContentInBaoMoiDetailPage(detailUrl)))
        
        
        News2Service.insert
        NewsModel.insertMany(contents).then(res => {
            console.log(res.length);
        }).catch(err => {
            console.log(err);
        })
    }

    try {
        res.status(200).send("Success")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getContentInBaoMoiDetailPage = async url => {
    const $ = await loadWebSite(url);

    title = $('h1.article__header').text()
    dated = new Date($('div.article__meta time').attr('datetime'))
    category = $('div.breadcrumb a.cate').first().text()
    summary = $('div.article__sapo').text()
    content = $('div.article__body').html()
    auth = $('p.body-author').text()
    site = "https://baomoi.com"
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