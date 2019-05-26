"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require('moment');
var Product = /** @class */ (function () {
    function Product(barcode, price) {
        this._barcode = barcode;
        this._price = price;
        this._updateDate = moment().format('YYYY:MM:DD hh:mm:ss'); //new Date(Date.now()).toISOString();
    }
    Object.defineProperty(Product.prototype, "barcode", {
        get: function () {
            return this._barcode;
        },
        set: function (value) {
            this._barcode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "updateDate", {
        get: function () {
            return this._updateDate;
        },
        set: function (value) {
            this._updateDate = value;
        },
        enumerable: true,
        configurable: true
    });
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=Product.js.map