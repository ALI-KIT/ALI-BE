const axios = require("axios");
const cheerio = require("cheerio");

exports.loadWebSite = async url => {
    return await axios
        .get(url)
        .then(response => cheerio.load(response.data, { decodeEntities: false }))
        .catch(error => {
            error.status = (error.response && error.response.status) || 500;
            throw error;
        });
}