const { default: BaseCrawler } = require("./BaseCrawler");


export default class BaseCrawlerParent extends BaseCrawler {
    isAbstractClass() { return true;}

    
}