"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var XMLCrawler_1 = require("./crawler/XMLCrawler");
var DATA_XML = { dirName: "xml-data", get path() { return path.join(__dirname, '/', this.dirName); } };
var node_env = process.env.NODE_ENV;
var run = function () {
    var isProd = !!node_env.match("PROD");
    var xmlCrawler = new XMLCrawler_1.XMLCrawler(isProd);
    var filesList = xmlCrawler.getAllXmlFiles(DATA_XML.path, []);
    xmlCrawler.update(filesList);
};
run();
//# sourceMappingURL=index.js.map