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
var StorageHandler_1 = require("../StorageHandler");
var path = require("path");
var fs = require("fs");
var StorageUtils_1 = require("../StorageUtils");
var SqlConsts_1 = require("../model/SqlConsts");
var PRODUCTS_OUTPUT = { filename: "products.json", get path() { return path.join(__dirname, '../../output', this.filename); } };
var PRICES_OUTPUT = { filename: "prices.json", get path() { return path.join(__dirname, '../../output', this.filename); } };
/**
 * Storage handler for Json file.
 * Implement new products and update mode for products prices
 */
var JsonStorageHandler = /** @class */ (function (_super) {
    __extends(JsonStorageHandler, _super);
    function JsonStorageHandler(isProd) {
        return _super.call(this, isProd) || this;
    }
    JsonStorageHandler.prototype.insert = function (products, updateMode) {
        return __awaiter(this, void 0, void 0, function () {
            var newProductsToInsert, updateProducts, _i, products_1, currProd, barcode, shopping_cart_firm_id, price, updatedProd, _a, products_2, currProd, barcode, product_name, brand_name, capacity, capacity_units_name, category_id, productNew;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        newProductsToInsert = [];
                        updateProducts = [];
                        if (!updateMode) return [3 /*break*/, 2];
                        for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                            currProd = products_1[_i];
                            barcode = currProd.barcode;
                            shopping_cart_firm_id = currProd.firmId;
                            price = currProd.price;
                            updatedProd = { barcode: barcode, price: price, shopping_cart_firm_id: shopping_cart_firm_id };
                            updateProducts.push(updatedProd);
                        }
                        return [4 /*yield*/, this.appendProductsToFile(updateProducts, PRICES_OUTPUT.path)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                    case 2:
                        for (_a = 0, products_2 = products; _a < products_2.length; _a++) {
                            currProd = products_2[_a];
                            barcode = currProd.barcode;
                            product_name = currProd.product_name;
                            brand_name = currProd.brand;
                            capacity = currProd.capacity;
                            capacity_units_name = StorageUtils_1.StorageUtils.capacityUnitHandler(currProd.capacity_unit);
                            category_id = void 0;
                            if (currProd.firmId == SqlConsts_1.StoresConsts.SHUFERSAL)
                                category_id = StorageUtils_1.StorageUtils.shufersalCategoriesHandler(currProd.category);
                            else
                                category_id = 0;
                            productNew = { barcode: barcode, product_name: product_name, brand_name: brand_name, capacity: capacity, capacity_units_name: capacity_units_name, category_id: category_id };
                            newProductsToInsert.push(productNew);
                        }
                        return [4 /*yield*/, this.appendProductsToFile(newProductsToInsert, PRODUCTS_OUTPUT.path)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    JsonStorageHandler.prototype.openConnection = function () {
    };
    JsonStorageHandler.prototype.appendProductsToFile = function (products, path) {
        return __awaiter(this, void 0, void 0, function () {
            var file_products;
            return __generator(this, function (_a) {
                try {
                    file_products = fs.readFileSync(path, 'utf-8');
                    file_products = !file_products ? [] : JSON.parse(file_products);
                    file_products = file_products.concat(products);
                    fs.writeFileSync(path, JSON.stringify(file_products), 'utf-8');
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
            });
        });
    };
    JsonStorageHandler.readProductsFromFile = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var file_products = fs.readFileSync(path, 'utf-8');
                        file_products = !file_products ? [] : JSON.parse(file_products);
                        resolve(file_products);
                    })];
            });
        });
    };
    return JsonStorageHandler;
}(StorageHandler_1.StorageHandler));
exports.JsonStorageHandler = JsonStorageHandler;
//# sourceMappingURL=JsonStorageHandler.js.map