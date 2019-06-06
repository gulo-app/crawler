"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crawler_1 = require("./Crawler");
var path = require("path");
var JsonStorageHandler_1 = require("../storagehandler/impl/JsonStorageHandler");
var TEST_OUTPUT = { filename: "pricestest.json", get path() { return path.join(__dirname, '../output', this.filename); } };
var RAMI_LEVI_XML = { filename: "ramilevi-prices.xml", get path() { return path.join(__dirname, '../data', this.filename); } };
var SHUFERSAL_XML = { filename: "shufersal-prices.xml", get path() { return path.join(__dirname, '../data', this.filename); } };
var YENOT_BITAN_XML = { filename: "yenotbitan-prices.xml", get path() { return path.join(__dirname, '../data', this.filename); } };
var run = function (urls) {
    //let xmlCrawler = new XMLCrawler();
    // xmlCrawler.crawl(urls);
    //xmlCrawler.update(urls);
    var crawler = new Crawler_1.Crawler();
    var products = crawler.crawl(urls);
    var productsToUpdate = JsonStorageHandler_1.JsonStorageHandler.readProductsFromFile(TEST_OUTPUT.path);
    var prodList = productsToUpdate.then(function (value) {
        crawler.update(value);
    });
};
run(['https://www.shufersal.co.il/online/he/A']);
//'https://www.shufersal.co.il/online/he/A', 'https://www.rami-levy.co.il/category/start_buy'
//# sourceMappingURL=index.js.map