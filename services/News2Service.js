const News = require('../models/news2')

exports.insert = async (news) => {
    const similars = await this.findSimilar(news);
    if(similars.length != 0) return false;

    try {
        await News.insert(news);
        return true;
    } catch(e) {
        return false;
    }
}

exports.findSimilar = async (news) => {
    /* tìm trong các bài có publicationDate >=< 7 ngày
    /* cùng aggregator, cùng source sẽ là cùng một bài */
    /* hoặc có title và summary tương tự nhau */
    const condition = {
      //  publicationDate: news.publicationDate && {$gte:new ISODate("2017-04-14T23:59:59Z"),$lte:new ISODate("2017-04-15T23:59:59Z")},
        
        aggregator: news.aggregator || '',
        aggregatorUrl: news.aggregatorUrl || '',

        source : news.source || '',
        sourceUrl: news.sourceUrl | ''
    }

    let result;
     try {
        result = await News.find(contition);
    } catch(e) {
        result = []
    }
    return result
}

exports.findById = async (id) => {

}

exports.find = async (condition) => {

}

exports.getAll = async () => {

}

exports.getAll = async (limit, skip) => {

}
