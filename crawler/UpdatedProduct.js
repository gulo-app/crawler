"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UpdatedProduct = /** @class */ (function () {
    function UpdatedProduct(barcode, price) {
        this._barcode = barcode;
        this._price = price;
    }
    Object.defineProperty(UpdatedProduct.prototype, "barcode", {
        get: function () {
            return this._barcode;
        },
        set: function (value) {
            this._barcode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpdatedProduct.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    return UpdatedProduct;
}());
exports.UpdatedProduct = UpdatedProduct;
//# sourceMappingURL=UpdatedProduct.js.map