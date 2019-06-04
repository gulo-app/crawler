"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require('moment');
var Product = /** @class */ (function () {
    function Product(barcode, price, firmId) {
        this._barcode = barcode;
        this._price = price;
        this._firmId = firmId;
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
    Object.defineProperty(Product.prototype, "firmId", {
        get: function () {
            return this._firmId;
        },
        set: function (value) {
            this._firmId = value;
        },
        enumerable: true,
        configurable: true
    });
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=Product.js.map