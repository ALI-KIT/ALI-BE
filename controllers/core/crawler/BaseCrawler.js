const { loadWebSite } = require("../../../utils/crawlUtils");
const AbstractBase = require("./AbstractBase");

/**
 * Lớp Base định nghĩa một web news crawler
 * - Một crawler crawl tin bài trên một site cố định
 * - Sau khi crawl, nó cũng ghi data hợp lệ và database
 * - Crawler có thể start một crawler khác, sau đó tổng hợp kết quả
 */
 module.exports = class BaseCrawler extends AbstractBase {
    isAbstractClass() { return true; }

    constructor() {
        super();
    }

    async execute() {
        const url = this.getDomainUrl();
        const html = await this.getHtml(url);
        const result = await this.parse(html);
        return result;
        
    }

    /**
    * Gọi hàm này để start crawl dữ liệu
    */
    async enqueue() {
        return await this.execute();
    }


    getName() {
        return "";
    }


    getDisplayName() {
        return "";
    }

    /**
     * Trả về đường dẫn url site
     */
    getDomainUrl() {
        this.throwAbstract();
    }

    /**
     * Trả về nội dung trang
     */
    async getHtml(url) {
        return await loadWebSite(url);
    }

    /**
     * return achievement object
     */
    async parse(html) {
        throwAbstract();
    }

}