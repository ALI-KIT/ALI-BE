/**
 * Lớp Base định nghĩa một web news crawler
 * - Một crawler crawl tin bài trên một site cố định
 * - Sau khi crawl, nó cũng ghi data hợp lệ và database
 * - Crawler có thể start một crawler khác, sau đó tổng hợp kết quả
 */
export default class BaseCrawler extends AbstractBase {
    isAbstractClass() { return true;}

    constructor() {
        super();
    }
/**
 * Gọi hàm này để tiến hành crawl dữ liệu
 */
    start() {
        this.throwAbstract();
    }

    getSite() {
        this.throwAbstract();
    }

    getHtml() {
        this.throwAbstract();
    }

    getAchievement() {

    }

    
}