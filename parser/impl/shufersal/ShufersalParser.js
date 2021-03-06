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
var SqlConsts_1 = require("../../../storagehandler/model/SqlConsts");
var cheerio = require('cheerio');
var Parser_1 = require("../../Parser");
var ParserUrls_1 = require("../../ParserUrls");
var NewProduct_1 = require("../../../product/NewProduct");
var Product_1 = require("../../../product/Product");
var ShufersalParser = /** @class */ (function (_super) {
    __extends(ShufersalParser, _super);
    function ShufersalParser() {
        var _this = _super.call(this) || this;
        _this.baseUrl = ParserUrls_1.ParserUrls.SHUFERSAL_HOME;
        _this.categoryUrl = ParserUrls_1.ParserUrls.SHUFERSAL_CATEGORY;
        return _this;
    }
    ShufersalParser.prototype.extractUrls = function (url, $) {
        if (!url.includes(this.categoryUrl)) {
            var urls = [];
            var menu = $('ul#secondMenu1 > li').toArray();
            for (var _i = 0, menu_1 = menu; _i < menu_1.length; _i++) {
                var li = menu_1[_i];
                try {
                    var category = li.attribs['xml-data-category'];
                    urls.push(this.categoryUrl + '/' + category);
                }
                catch (e) {
                    continue;
                }
            }
            return urls;
        }
        else
            return [];
    };
    ShufersalParser.prototype.parse = function (url, $, updateMode, productsId) {
        if (updateMode === void 0) { updateMode = false; }
        if (productsId === void 0) { productsId = void 0; }
        if (productsId == undefined)
            productsId = [];
        if (url.includes(this.categoryUrl)) {
            try {
                var productsList = $('li.miglog-prod.miglog-sellingmethod-by_unit').toArray();
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
    ShufersalParser.prototype.parseNew = function (products, url) {
        var parsedProducts = [];
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            var $ = cheerio.load(product);
            var capacityInfo = $('div > div.textContainer > div > div.labelsListContainer > div > span:nth-child(1)')
                .text().split(' ');
            var brand_name = $('div > div.textContainer > div > div.labelsListContainer > div > span:nth-child(2)').text();
            var category = url.split('/');
            var barcode = product.attribs['xml-data-product-code'].replace('P_', '');
            var product_name = product.attribs['xml-data-product-name'];
            var product_price = product.attribs['xml-data-product-price'];
            try {
                var newProduct = new NewProduct_1.NewProduct(Number(barcode), product_name, Number(product_price), url, Number(capacityInfo[0]), capacityInfo[1], brand_name, category[category.length - 1], SqlConsts_1.StoresConsts.SHUFERSAL);
                console.log(newProduct);
                parsedProducts.push(newProduct);
            }
            catch (e) {
                continue; //if a KeyError thrown
            }
        }
        return parsedProducts;
    };
    //TODO: check if works - test
    ShufersalParser.prototype.parseUpdate = function (products, productsBarcodeList) {
        if (productsBarcodeList === void 0) { productsBarcodeList = void 0; }
        var updatedProducts = [];
        var productsIdWithPrefix = productsBarcodeList.map(function (value) {
            return 'P_' + value;
        });
        for (var _i = 0, products_2 = products; _i < products_2.length; _i++) {
            var product = products_2[_i];
            if (productsIdWithPrefix.includes(product.attribs['xml-data-product-code'])) {
                updatedProducts.push(new Product_1.Product(Number(product.attribs['xml-data-product-code'].replace('P_', '')), Number(product.attribs['xml-data-product-price']), SqlConsts_1.StoresConsts.SHUFERSAL));
            }
        }
        return updatedProducts;
    };
    return ShufersalParser;
}(Parser_1.Parser));
exports.ShufersalParser = ShufersalParser;
//# sourceMappingURL=ShufersalParser.js.map