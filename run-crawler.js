"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crawler_1 = require("./crawler/Crawler");
var node_env = process.env.NODE_ENV;
var run = function (urls) {
    var isProd = !!node_env.match("PROD");
    var crawler = new Crawler_1.Crawler(isProd);
    crawler.crawl(urls);
};
run(['https://www.shufersal.co.il/online/he/A', 'https://www.rami-levy.co.il/category/start_buy']);
//# sourceMappingURL=run-crawler.js.map