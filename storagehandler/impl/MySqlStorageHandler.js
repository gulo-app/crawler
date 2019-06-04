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
var mysql = require("mysql");
var SqlFields_1 = require("../model/SqlFields");
//const IS_PROD  =  process.env.IS_PROD;
var MySqlStorageHandler = /** @class */ (function (_super) {
    __extends(MySqlStorageHandler, _super);
    function MySqlStorageHandler(isProd) {
        var _this = _super.call(this, isProd) || this;
        if (isProd) {
            console.log("running on remote mySQL");
        }
        _this._conn = _this.openConnection();
        return _this;
    }
    MySqlStorageHandler.prototype.openConnection = function () {
        return mysql.createPool({
            host: this.isProd ? '35.205.128.46' : 'localhost',
            user: "gulo",
            password: "shenkar",
            database: "gulo",
            connectionLimit: 1,
            supportBigNumbers: true,
            multipleStatements: true
        });
    };
    MySqlStorageHandler.prototype.insert = function (products, updateMode) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, products_1, product, productMap, newBrand, results, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (products.length == 0) {
                            console.log("nothing to insert, products list is empty");
                            return [2 /*return*/];
                        }
                        _i = 0, products_1 = products;
                        _a.label = 1;
                    case 1:
                        if (!(_i < products_1.length)) return [3 /*break*/, 10];
                        product = products_1[_i];
                        productMap = this.prepareNewProductMap(product);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        if (!!updateMode) return [3 /*break*/, 6];
                        newBrand = void 0;
                        return [4 /*yield*/, this.query("SELECT brand_id FROM brands WHERE brand_name = \"\u05E9\u05D5\u05E4\u05E8\u05E1\u05DC\";")];
                    case 3:
                        results = _a.sent();
                        /*     function (error, rows) {
                         if(error) throw error;
                         else{
                             setResults(rows);
                         }
                     });
 
                     if(results.length > 0){
                         newBrand = results.pop();
                         console.log(newBrand);
                     }*/
                        return [4 /*yield*/, this.query("INSERT INTO products\n                      (barcode, product_name, brand_id, capacity, capacity_unit_id, verifiedCounter)\n                       VALUES\n                      (" + Number(productMap.get(SqlFields_1.SqlFields.BARCODE)) + ", \"" + productMap.get(SqlFields_1.SqlFields.PRODUCT_NAME) + "\", \n                        " + Number(newBrand) + ", " + Number(productMap.get(SqlFields_1.SqlFields.CAPACITY)) + ", \n                        " + Number(productMap.get(SqlFields_1.SqlFields.CAPACITY_UNIT)) + ", 0)\n                       ON DUPLICATE KEY UPDATE verifiedCounter = verifiedCounter + 1;\n                    ")];
                    case 4:
                        /*     function (error, rows) {
                         if(error) throw error;
                         else{
                             setResults(rows);
                         }
                     });
 
                     if(results.length > 0){
                         newBrand = results.pop();
                         console.log(newBrand);
                     }*/
                        _a.sent();
                        return [4 /*yield*/, this.query("INSERT INTO product_category (" + SqlFields_1.ProductCategoryField.BARCODE + ", " + SqlFields_1.ProductCategoryField.CATEGORY_ID + ")\n                        VALUES\n                        (" + productMap.get(SqlFields_1.SqlFields.BARCODE) + ", " + productMap.get(SqlFields_1.SqlFields.CATEGORY) + ")\n                    ")];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.query("INSERT INTO shopping_cart_prices\n                      (" + SqlFields_1.ShoppingCartField.FIRM_ID + " ," + SqlFields_1.ShoppingCartField.BARCODE + ", " + SqlFields_1.ShoppingCartField.PRICE + ", " + SqlFields_1.ShoppingCartField.LINK + ")\n                       VALUES\n                      (" + Number(productMap.get(SqlFields_1.ShoppingCartField.FIRM_ID)) + ", \n                       " + productMap.get(SqlFields_1.ShoppingCartField.BARCODE) + ",\n                       " + Number(productMap.get(SqlFields_1.ShoppingCartField.PRICE)) + ", \n                      \"" + productMap.get(SqlFields_1.ShoppingCartField.LINK) + "\"\n                       ON DUPLICATE KEY UPDATE \n                       " + SqlFields_1.ShoppingCartField.PRICE + " = " + productMap.get(SqlFields_1.ShoppingCartField.PRICE) + ";\n                     ")];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 9];
                    case 9:
                        _i++;
                        return [3 /*break*/, 1];
                    case 10:
                        console.log("update " + products.length + " products prices successfully.");
                        return [2 /*return*/];
                }
            });
        });
    };
    MySqlStorageHandler.prototype.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._conn.query(query, function (err, rows) {
                            if (err) {
                                //console.log(err);
                                reject(err);
                            }
                            resolve(rows);
                        });
                    })];
            });
        });
    };
    MySqlStorageHandler.prototype.close = function () {
        this._conn.end();
    };
    return MySqlStorageHandler;
}(StorageHandler_1.StorageHandler));
exports.MySqlStorageHandler = MySqlStorageHandler;
//# sourceMappingURL=MySqlStorageHandler.js.map