"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(barcode, name, price, url, capacity, capacityUnit) {
        this._barcode = barcode;
        this._name = name;
        this._price = price;
        this._url = url;
        this._capacity = capacity;
        this._capacityUnit = capacityUnit;
        this._updateDate = Date.now();
    }
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "capacity", {
        get: function () {
            return this._capacity;
        },
        set: function (value) {
            this._capacity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "capacityUnit", {
        get: function () {
            return this._capacityUnit;
        },
        set: function (value) {
            this._capacityUnit = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(Product.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
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