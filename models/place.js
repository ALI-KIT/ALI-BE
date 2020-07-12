var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    name: String,
    dated: {
        type: Date,
        default: Date.now()
    },
    keywords: [String],
    regex: String,
    flat: {
        type: String,
        default: 'iu'
    }
});

// Biên dịch mô hình từ schema
var PlaceModel = mongoose.model('place', PlaceSchema);

module.exports = PlaceModel