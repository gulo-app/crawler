"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ShufersalParser_1 = require("../parser/impl/shufersal/ShufersalParser");
var Downloader_1 = require("../downloader/Downloader");
var RamiLevyParser_1 = require("../parser/impl/ramilevy/RamiLevyParser");
var JsonStorageHandler_1 = require("../storagehandler/impl/JsonStorageHandler");
var cheerio = require('cheerio');
var Crawler = /** @class */ (function () {
    function Crawler() {
        this.parsersList = {
            'shufersal.co.il/online/he/A': new ShufersalParser_1.ShufersalParser(),
            'shufersal.co.il/online/he/c': new ShufersalParser_1.ShufersalParser(),
            'https://www.rami-levy.co.il/category/start_buy': new RamiLevyParser_1.RamiLevyParser(),
            'https://www.rami-levy.co.il/default.asp?catid=': new RamiLevyParser_1.RamiLevyParser()
        };
        this._storageHandler = new JsonStorageHandler_1.JsonStorageHandler(false);
        this._finishedParseList = new Array();
    }
    Crawler.prototype.findParser = function (url) {
        for (var key in this.parsersList) {
            if (url.includes(key)) {
                return this.parsersList[key];
            }
        }
        return null;
    };
    Crawler.prototype.crawl = function (urls) {
        return __awaiter(this, void 0, void 0, function () {
            var newProducts, urlsToCrawl, currentUrl, parser, html, $, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newProducts = [];
                        urlsToCrawl = urls;
                        _a.label = 1;
                    case 1:
                        if (!urlsToCrawl.length) return [3 /*break*/, 5];
                        currentUrl = urlsToCrawl.pop();
                        if (this._finishedParseList.indexOf(currentUrl) != -1)
                            return [3 /*break*/, 1];
                        parser = this.findParser(currentUrl);
                        console.log("start to crawl in url:  " + currentUrl);
                        if (!parser) return [3 /*break*/, 4];
                        return [4 /*yield*/, Downloader_1.Downloader.downloadHtml(currentUrl)];
                    case 2:
                        html = _a.sent();
                        return [4 /*yield*/, cheerio.load(html)];
                    case 3:
                        $ = _a.sent();
                        if ($) {
                            products = parser.parse(currentUrl, $, false, undefined);
                            this._finishedParseList.push(currentUrl);
                            if (products) {
                                if (products.length != 0) {
                                    Array.prototype.push.apply(newProducts, products);
                                }
                            }
                            Array.prototype.push.apply(urlsToCrawl, parser.extractUrls(currentUrl, $));
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5: return [4 /*yield*/, this._storageHandler.insert(newProducts, false)];
                    case 6:
                        _a.sent();
                        //console.log(newProducts);
                        console.log(newProducts.length);
                        return [2 /*return*/, newProducts];
                }
            });
        });
    };
    //TODO: test if works
    Crawler.prototype.update = function (products) {
        return __awaiter(this, void 0, void 0, function () {
            var uniqueUrls, updated, _i, products_1, product, _a, _b, _c, url_1, parser, html, $;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        uniqueUrls = {};
                        updated = [];
                        // @ts-ignore
                        for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                            product = products_1[_i];
                            if (!uniqueUrls.hasOwnProperty(product['link'])) {
                                uniqueUrls[product['link']] = [];
                                uniqueUrls[product['link']].push(product['barcode']);
                            }
                            else {
                                uniqueUrls[product['link']].push(product['barcode']);
                            }
                        }
                        _a = [];
                        for (_b in uniqueUrls)
                            _a.push(_b);
                        _c = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_c < _a.length)) return [3 /*break*/, 4];
                        url_1 = _a[_c];
                        parser = this.findParser(url_1);
                        if (!parser) return [3 /*break*/, 3];
                        return [4 /*yield*/, Downloader_1.Downloader.downloadHtml(url_1)];
                    case 2:
                        html = _d.sent();
                        $ = cheerio.load(html);
                        if ($) {
                            Array.prototype.push.apply(updated, parser.parse(url_1, $, true, uniqueUrls[url_1]));
                        }
                        _d.label = 3;
                    case 3:
                        _c++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this._storageHandler.insert(updated, true)];
                    case 5:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Crawler.prototype.close = function () {
        //this._storageHandler.close();
    };
    return Crawler;
}());
exports.Crawler = Crawler;
//get ParserUrls.getAll()
//foreach url in urls:
//  if there is parser in parser list for url
//          parse()
//  Parser.extractUrls
//extractUrls products and create new NewProduct
// add product to storageHandlerList.add
//
//storage.insert
//# sourceMappingURL=Crawler.js.map