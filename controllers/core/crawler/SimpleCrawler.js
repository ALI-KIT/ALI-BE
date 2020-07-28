const BaseCrawler = require("./BaseCrawler");

module.exports = class SimpleCrawler extends BaseCrawler {
    isAbstractClass() {return false;}
    constructor(url, name = "", displayName = "") {
        super();
        this.url = url || "";
        this.name = name || "";
        this.displayName = displayName || "";
    }

    setUrl(url) {
        this.url = url;
    }

    getDisplayName() {return this.displayName;}
    getName() {return this.name;}
    getDomainUrl() {return this.url;}

    async parse(html) {
        return html;
    }
}