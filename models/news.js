var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: String,
    dated: {
        type: Date,
        default: Date.now()
    },
    category: String,
    summary: String,
    content: String,
    auth: {
        type: String,
        default: "Nguyễn Minh Trường"
    },
    site: String,
    url: String,
    source: String,
    thumbnail: String
});

// Biên dịch mô hình từ schema
var NewsModel = mongoose.model('news', NewsSchema);

module.exports = NewsModel