"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var XMLCrawler_1 = require("./XMLCrawler");
var TEST_OUTPUT = { filename: "pricestest.json", get path() { return path.join(__dirname, '../output', this.filename); } };
var RAMI_LEVI_XML = { filename: "ramilevi-prices.xml", get path() { return path.join(__dirname, '../data', this.filename); } };
var SHUFERSAL_XML = { filename: "shufersal-prices.xml", get path() { return path.join(__dirname, '../data', this.filename); } };
var YENOT_BITAN_XML = { filename: "yenotbitan-prices.xml", get path() { return path.join(__dirname, '../data', this.filename); } };
var run = function (urls) {
    var xmlCrawler = new XMLCrawler_1.XMLCrawler();
    //xmlCrawler.crawl(urls);
    xmlCrawler.update(urls);
    //let crawler = new Crawler();
    //let products = crawler.crawl(urls);
    //let productsToUpdate = JsonStorageHandler.readProductsFromFile(TEST_OUTPUT.path);
    //let prodList = productsToUpdate.then(function(value) {
    //   crawler.update(value);
    //});
};
run([YENOT_BITAN_XML.path, SHUFERSAL_XML.path, RAMI_LEVI_XML.path]);
//'https://www.shufersal.co.il/online/he/A', 'https://www.rami-levy.co.il/category/start_buy'
//# sourceMappingURL=index.js.map