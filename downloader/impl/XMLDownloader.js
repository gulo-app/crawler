"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var convert = require('xml-js');
/**
 * Download xml file and convert it to JSON.
 */
var XMLDownloader = /** @class */ (function () {
    function XMLDownloader() {
    }
    XMLDownloader.downloadXMLFile = function (file) {
        var xmlFile = fs.readFileSync(file, 'utf-8');
        var productsFile = convert.xml2json(xmlFile, { compact: true, spaces: 4 });
        productsFile = !productsFile ? [] : JSON.parse(productsFile);
        return productsFile;
    };
    return XMLDownloader;
}());
exports.XMLDownloader = XMLDownloader;
//# sourceMappingURL=XMLDownloader.js.map