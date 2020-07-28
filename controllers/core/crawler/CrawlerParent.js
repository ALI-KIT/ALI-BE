const BaseCrawler = require("./BaseCrawler");

/**
 * Call nhiều crawler
 * Tổng hợp kết quả từ các crawler rồi trả về kết quả
 */
module.exports = class CrawlerParent extends BaseCrawler {
    isAbstractClass() { return false; }

    childs = [];

    addChild(crawler) {
        this.childs.push(crawler);
    }
    
    /**
     * Thực thi lần lượt các childs theo thứ tự
     */
    async execute() {
        await this.selfExecute();
        const result = [];
        for( const element of childs) {
            try {
                const value = await element.execute();
                result.push(value);
            } catch (e) { result.push([]) }
        };
        return this.parse(result);
    }

    /**
     * Start đồng thời tất cả các child miễn trong giới hạn executor
     */
    async enqueue() {
        await this.selfEnqueue();
        const values = await Promise.all(this.childs.map(async element => await element.enqueue()));

        const result = await this.parse(values);
        return result;

    }

    /**
     * Hậu xử lý
     * 
     * @param values 
     */
    async parse(values) {
        if (Array.isArray(values) && values.length != 0 && Array.isArray(values[0])) {
            const result = [];
            values.forEach(element => {
                Array.prototype.push.apply(result, element);
            });
            return result;
        } else return values;
    }

    getDomainUrl() { return undefined;}

    /**
     * Execute chỉ bản thân parent
     */
    async selfExecute() {
        if(this.getDomainUrl()) {
            const url = this.getDomainUrl();
            const html = await this.getHtml(url);
            const result = await this.selfParse(html);
            return result;
        }
    }

    /**
     * Enqueue bản thân parent
     */
    async selfEnqueue() {
        if(this.getDomainUrl())
        return await this.selfExecute();
    }

    /**
     * Tiền xử lý
     * Hãy thêm các child để các child tiến hành xử lý thông tin parent tìm được 
     */
    async selfParse(value) {
        return value;
    }
}