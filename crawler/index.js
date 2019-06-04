"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crawler_1 = require("./Crawler");
var path = require("path");
var JsonStorageHandler_1 = require("../storagehandler/impl/JsonStorageHandler");
var TEST_OUTPUT = { filename: "pricestest.json", get path() { return path.join(__dirname, '../output', this.filename); } };
var run = function (urls) {
    var crawler = new Crawler_1.Crawler();
    //let products = crawler.crawl(urls);
    var products = JsonStorageHandler_1.JsonStorageHandler.readProductsFromFile(TEST_OUTPUT.path);
    var prodList = products.then(function (value) {
        crawler.update(value);
    });
};
run(['https://www.shufersal.co.il/online/he/A']);
//'https://www.shufersal.co.il/online/he/A', 'https://www.rami-levy.co.il/category/start_buy'
//# sourceMappingURL=index.js.map