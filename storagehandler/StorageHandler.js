"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqlFields_1 = require("./model/SqlFields");
var StorageUtils_1 = require("./StorageUtils");
var Product_1 = require("../product/Product");
var StorageHandler = /** @class */ (function () {
    function StorageHandler(isProd) {
        this.isProd = isProd;
    }
    StorageHandler.prototype.prepareNewProductMap = function (product) {
        var prodMap = this.prepareBasicProduct(product);
        if (typeof product === Product_1.Product.name) {
            return prodMap;
        }
        prodMap.set(SqlFields_1.SqlFields.PRODUCT_NAME, product.product_name);
        prodMap.set(SqlFields_1.SqlFields.BRAND_NAME, product.brand);
        if (product.capacity === NaN) {
            // @ts-ignore
            product.capacity(0);
        }
        prodMap.set(SqlFields_1.SqlFields.CAPACITY, product.capacity.toString());
        prodMap.set(SqlFields_1.ShoppingCartField.LINK, product.url);
        prodMap.set(SqlFields_1.SqlFields.CAPACITY_UNIT, StorageUtils_1.StorageUtils.capacityUnitHandler(product.capacity_unit).toString());
        prodMap.set(SqlFields_1.SqlFields.CATEGORY, StorageUtils_1.StorageUtils.categoriesHandler(product.category).toString());
        return prodMap;
    };
    StorageHandler.prototype.prepareBasicProduct = function (product) {
        var prodMap = new Map();
        if (typeof product.barcode === "number") {
            prodMap.set(SqlFields_1.SqlFields.BARCODE, product.barcode);
        }
        prodMap.set(SqlFields_1.ShoppingCartField.PRICE, product.price);
        prodMap.set(SqlFields_1.ShoppingCartField.FIRM_ID, product.firmId.toString());
        return prodMap;
    };
    return StorageHandler;
}());
exports.StorageHandler = StorageHandler;
//# sourceMappingURL=StorageHandler.js.map