const SimpleCrawler = require("../SimpleCrawler");
const e = require("express");

module.exports = class BaoMoiXemTinCrawler extends SimpleCrawler {
    constructor(url) {
        super(url, "baomoi-xemtin", "Báo mới, Xem tin");
    }

    async parse(html) {
        return await this.innerParsing(html);
    }

    async innerParsing($) {
        const title = $('h1.article__header').text()
        const summary = $('div.article__sapo').text()
        const content = $('div.article__body').html()
        const aggregator = {
            name : 'baomoi',
            displayName : 'Báo mới',
            url: this.getDomainUrl()
        };
        const source = {
            name : undefined,
            displayName : $('div.article a.source').first().text().trim(),
            url :  $('p.bm-source a').attr('href')
        }
        const thumbnail= $('div.article p.body-image img').first().attr('src');
        
        const crawlDate = Date.now();
        const publicationDate = new Date($('div.article__meta time').attr('datetime'))
        const categories = $('div.breadcrumb a.cate').toArray().map(element => $(element).text().trim());
        const tagArray = $('div .keyword').toArray();
        const keywords = tagArray.map(element => $(element).text().trim());
        const url = this.getDomainUrl();
        const locals = [];
        return {
            title,
            summary,
            content,
             thumbnail,
             crawlDate,
             publicationDate,
             aggregator,
             source,
             keywords,
             categories,
             locals
        }
    }
}
