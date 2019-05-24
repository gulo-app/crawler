"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crawler_1 = require("./Crawler");
var run = function (urls) {
    var crawler = new Crawler_1.Crawler();
    var products = crawler.crawl(urls);
    crawler.update(products);
};
run(['https://www.shufersal.co.il/online/he/A']);
// 'https://www.rami-levy.co.il/category/start_buy'
//# sourceMappingURL=index.js.map