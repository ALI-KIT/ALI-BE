const CrawlerParent = require("../CrawlerParent");
const BaoMoiXemTinCrawler = require("./BaoMoiXemTinCrawler");

module.exports = class BaoMoiTinMoiCrawler extends CrawlerParent {
    isAbstractClass() { return false; }
    constructor() {
        super();

        for (var i = 1; i <= 30; i++)
            this.childs.push(new SingleBaoMoiTinMoiCrawler(i));
    }

    async parse(values) {
        return await super.parse(values);
    }

    getDisplayName() { return "Báo mới, Tin mới"; }
    getName() { "baomoi-tinmoi" }

}

class SingleBaoMoiTinMoiCrawler extends CrawlerParent {
    isAbstractClass() { return false; }
    constructor(page) {
        super();
        this.baseUrl = "https://baomoi.com"
        this.page = page || 1;
    }

    getDisplayName() {
        return "Báo mới, Tin mới";
    }

    getName() {
        return "baomoi-tinmoi";
    }


    getDomainUrl() { return this.baseUrl + "/tin-moi/trang" + this.page + ".epi?loadMore=1"; }

    async selfParse($) {
        const items = [];
        $('div.story:not(.story--video,.story--photo,.wait-render) a.cache').each((i, e) => {
            items.push(this.baseUrl + $(e).attr('href'));
        });

        items.map(item => this.childs.push(new BaoMoiXemTinCrawler(item)));
    }
    async parse(values) {
        return await super.parse(values);
    }
}