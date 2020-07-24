var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    thumbnail: String,

    /* ngày kéo dữ liệu */
    crawlDate: {
        type: Date,
        default: Date.now()
    },

    /* ngày xuất bản */
    publicationDate: {
        type: Date,
        default: Date.now()
    },

    /* thông tin của trang tổng hợp tin tức */
    aggregator: String,
    aggregatorName: String,
    aggregatorUrl: String,

    /* thông tin của trang bài viết gốc */
    source: String,
    sourceName: String,
    sourceUrl: String,

    /* keywords, hay tags của tin bài */
    keywords: { type : Array , default : [] },

    /* địa phương liên quan của tin bài */
    locals: {type: Array, default : []},

    /* Thể loại tin bài */
    categories: {type: Array, default : []},
});

// Biên dịch mô hình từ schema
var NewsModel = mongoose.model('test-news-2', NewsSchema);

module.exports = NewsModel