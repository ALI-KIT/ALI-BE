var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    Title: String,
    Dated: {
        type: Date,
        default: Date.now()
    },
    Category: String,
    Summary: String,
    Content: String,
    Auth: {
        type: String,
        default: "Nguyễn Minh Trường"
    },
    Site: String,
    Url: String,
    Source: String,
});

// Biên dịch mô hình từ schema
var PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel