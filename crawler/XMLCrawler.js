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
var SqlConsts_1 = require("../storagehandler/model/SqlConsts");
var XMLParser_1 = require("./XMLParser");
var XMLDownloader_1 = require("../downloader/impl/XMLDownloader");
var MySqlStorageHandler_1 = require("../storagehandler/impl/MySqlStorageHandler");
var XMLCrawler = /** @class */ (function () {
    function XMLCrawler() {
        this.parsersList = {
            'shufersal-prices': new XMLParser_1.XMLParser(SqlConsts_1.StoresConsts.SHUFERSAL),
            'ramilevi-prices': new XMLParser_1.XMLParser(SqlConsts_1.StoresConsts.RAMI_LEVI),
            'yenotbitan-prices': new XMLParser_1.XMLParser(SqlConsts_1.StoresConsts.YENOT_BITAN)
        };
        this._storageHandler = new MySqlStorageHandler_1.MySqlStorageHandler(false);
    }
    XMLCrawler.prototype.findParser = function (url) {
        for (var key in this.parsersList) {
            if (url.includes(key)) {
                return this.parsersList[key];
            }
        }
        return null;
    };
    XMLCrawler.prototype.crawl = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var newProducts, filesToCrawl, currentFile, parser, jsonFile, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newProducts = [];
                        filesToCrawl = files;
                        while (filesToCrawl.length) {
                            currentFile = filesToCrawl.pop();
                            parser = this.findParser(currentFile);
                            console.log("start to crawl in file:  " + currentFile + ", store id:" + parser.firmId);
                            if (parser) {
                                jsonFile = XMLDownloader_1.XMLDownloader.downloadXMLFile(currentFile);
                                products = parser.parseNew(jsonFile);
                                if (products) {
                                    if (products.length != 0) {
                                        Array.prototype.push.apply(newProducts, products);
                                    }
                                }
                            }
                        }
                        return [4 /*yield*/, this._storageHandler.insert(newProducts, false)];
                    case 1:
                        _a.sent();
                        console.log("Finished parse " + newProducts.length + " new products");
                        return [2 /*return*/];
                }
            });
        });
    };
    XMLCrawler.prototype.update = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, filesToCrawl, currentFile, parser, jsonFile, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updated = [];
                        filesToCrawl = files;
                        while (filesToCrawl.length) {
                            currentFile = filesToCrawl.pop();
                            parser = this.findParser(currentFile);
                            console.log("start to crawl in file:  " + currentFile + ", store id:" + parser.firmId);
                            if (parser) {
                                jsonFile = XMLDownloader_1.XMLDownloader.downloadXMLFile(currentFile);
                                products = parser.parseUpdate(jsonFile);
                                if (products) {
                                    if (products.length != 0) {
                                        Array.prototype.push.apply(updated, products);
                                    }
                                }
                            }
                        }
                        return [4 /*yield*/, this._storageHandler.insert(updated, true)];
                    case 1:
                        _a.sent();
                        console.log("Finished update " + updated.length + " prices of products");
                        this._storageHandler.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return XMLCrawler;
}());
exports.XMLCrawler = XMLCrawler;
//# sourceMappingURL=XMLCrawler.js.map