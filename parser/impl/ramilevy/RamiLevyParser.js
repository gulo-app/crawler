"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var NewProduct_1 = require("../../../product/NewProduct");
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var Parser_1 = require("../../Parser");
var ParserUrls_1 = require("../../ParserUrls");
var SqlConsts_1 = require("../../../storagehandler/model/SqlConsts");
var Product_1 = require("../../../product/Product");
var TMP_FILE = { filename: 'tmp_products.json', get path() { return path.join(__dirname, './output', this.filename); } };
var OUTPUT = { filename: 'output.json', get path() { return path.join(__dirname, '../output', this.filename); } };
var RamiLevyParser = /** @class */ (function (_super) {
    __extends(RamiLevyParser, _super);
    function RamiLevyParser() {
        var _this = _super.call(this) || this;
        _this.baseUrl = ParserUrls_1.ParserUrls.RAMI_LEVI_HOME;
        _this.categoryUrl = ParserUrls_1.ParserUrls.RAMI_LEVI_CATEGORY;
        return _this;
    }
    RamiLevyParser.prototype.extractUrls = function (url, $) {
        var urls = [];
        if (url.match('https://www.rami-levy.co.il/category/start_buy')) {
            var menu = $('div.level1 > div > ul.level1 > li > a').toArray();
            for (var _i = 0, menu_1 = menu; _i < menu_1.length; _i++) {
                var a = menu_1[_i];
                try {
                    var category = a.attribs['href'];
                    urls.push(this.baseUrl + category);
                }
                catch (e) {
                    continue;
                }
            }
            return urls;
        }
        else if (url.includes(this.categoryUrl)) {
            var menu = $('div.level2 > div > ul.level2 > li > a').toArray();
            for (var _a = 0, menu_2 = menu; _a < menu_2.length; _a++) {
                var a = menu_2[_a];
                try {
                    var category = a.attribs['href'];
                    urls.push(this.baseUrl + category);
                }
                catch (e) {
                    continue;
                }
            }
            return urls;
        }
        else {
            return [];
        }
    };
    RamiLevyParser.prototype.parse = function (url, $, updateMode, productsId) {
        if (productsId == undefined)
            productsId = [];
        if (url.includes(this.categoryUrl)) {
            try {
                var productsList = $('div.product_item').toArray();
                if (updateMode)
                    return this.parseUpdate(productsList, productsId);
                return this.parseNew(productsList, url);
            }
            catch (e) {
                return undefined;
            }
        }
        else {
            // no products to parse in this page...
            return undefined;
        }
    };
    RamiLevyParser.prototype.parseUpdate = function (productsList, productsId) {
        if (productsId === void 0) { productsId = void 0; }
        var updatedProducts = [];
        for (var _i = 0, productsList_1 = productsList; _i < productsList_1.length; _i++) {
            var product = productsList_1[_i];
            var productsIdWithPrefix = productsId.map(function (value) {
                return '/files/products/big/' + value + '.jpg';
            });
            if (productsIdWithPrefix.includes(product.attribs['data-src'])) {
                var $ = cheerio.load(product);
                var imgObj = $('div.image > img').attr('src').split("/");
                var barcode = imgObj[imgObj.length - 1].replace(".jpg", " ");
                var prodPrice = $('div.prodPrice').text().replace('\u20aa', " ");
                updatedProducts.push(new Product_1.Product(Number(barcode), Number(prodPrice), SqlConsts_1.StoresConsts.RAMI_LEVI));
            }
        }
        return updatedProducts;
    };
    RamiLevyParser.prototype.parseNew = function (products, url) {
        var parsedProducts = [];
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            var $ = cheerio.load(product);
            var imgObj = $('div.image > img').attr('src').split("/");
            var barcode = imgObj[imgObj.length - 1].replace(".jpg", " ");
            var prodName = $('div.prodDescDiv > h3.prodName').text();
            var prodBrand = $('div.prodBrand').text().replace("מותג:", " ");
            var prodPrice = $('div.prodPrice').text().replace('\u20aa', " "); // remove the shekel sign
            var category = $('div.level1 > div > ul > li.current > a').attr("href");
            var nameToParse = prodName.split(" ");
            var capacityUnit = void 0;
            var capacity = void 0;
            var checkString = nameToParse[nameToParse.length - 1];
            if (Number.isNaN(Number.parseFloat(checkString))) {
                // only string, no numbers
                capacityUnit = checkString;
                capacity = nameToParse[nameToParse.length - 2];
            }
            else {
                //string with num like '100גרם'
                capacity = parseFloat(checkString);
                capacityUnit = checkString.replace(new RegExp('/[0-9]/g'), '');
            }
            try {
                var newProduct = new NewProduct_1.NewProduct(Number(barcode), prodName, prodPrice, url, capacity, capacityUnit, prodBrand, category, SqlConsts_1.StoresConsts.RAMI_LEVI);
                parsedProducts.push(newProduct);
            }
            catch (e) {
                continue; //if a KeyError thrown
            }
        }
        return parsedProducts;
    };
    return RamiLevyParser;
}(Parser_1.Parser));
exports.RamiLevyParser = RamiLevyParser;
//# sourceMappingURL=RamiLevyParser.js.map