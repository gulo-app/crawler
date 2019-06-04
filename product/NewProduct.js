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
var Product_1 = require("./Product");
var NewProduct = /** @class */ (function (_super) {
    __extends(NewProduct, _super);
    function NewProduct(barcode, name, price, url, capacity, capacityUnit, brand, category, firm) {
        var _this = _super.call(this, barcode, price, firm) || this;
        _this._product_name = name;
        _this._capacity = capacity;
        _this._capacity_unit = capacityUnit;
        _this._brand = brand;
        _this._category = category;
        _this._url = url;
        return _this;
    }
    Object.defineProperty(NewProduct.prototype, "product_name", {
        get: function () {
            return this._product_name;
        },
        set: function (value) {
            this._product_name = value;
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
    Object.defineProperty(NewProduct.prototype, "capacity_unit", {
        get: function () {
            return this._capacity_unit;
        },
        set: function (value) {
            this._capacity_unit = value;
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
    return NewProduct;
}(Product_1.Product));
exports.NewProduct = NewProduct;
//# sourceMappingURL=NewProduct.js.map