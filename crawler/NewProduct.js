"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewProduct = /** @class */ (function () {
    function NewProduct(barcode, name, price, url, capacity, capacityUnit, brand, category) {
        this._barcode = barcode;
        this._name = name;
        this._price = price;
        this._url = url;
        this._capacity = capacity;
        this._capacityUnit = capacityUnit;
        this._updateDate = Date.now();
        this._brand = brand;
        this._category = category;
    }
    Object.defineProperty(NewProduct.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewProduct.prototype, "capacity", {
        get: function () {
            return this._capacity;
        },
        set: function (value) {
            this._capacity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewProduct.prototype, "capacityUnit", {
        get: function () {
            return this._capacityUnit;
        },
        set: function (value) {
            this._capacityUnit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewProduct.prototype, "barcode", {
        get: function () {
            return this._barcode;
        },
        set: function (value) {
            this._barcode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewProduct.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewProduct.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewProduct.prototype, "updateDate", {
        get: function () {
            return this._updateDate;
        },
        set: function (value) {
            this._updateDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewProduct.prototype, "brand", {
        get: function () {
            return this._brand;
        },
        set: function (value) {
            this._brand = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewProduct.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (value) {
            this._category = value;
        },
        enumerable: true,
        configurable: true
    });
    return NewProduct;
}());
exports.NewProduct = NewProduct;
//# sourceMappingURL=NewProduct.js.map