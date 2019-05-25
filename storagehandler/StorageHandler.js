"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqlFields_1 = require("./model/SqlFields");
var SqlConsts_1 = require("./model/SqlConsts");
var StorageHandler = /** @class */ (function () {
    function StorageHandler(isProd) {
        this.isProd = isProd;
    }
    StorageHandler.prototype.prepareNewProductMap = function (product) {
        var prodMap = new Map();
        if (typeof product.barcode === "number") {
            prodMap.set(SqlFields_1.SqlFields.BARCODE, product.barcode);
        }
        prodMap.set(SqlFields_1.SqlFields.PRODUCT_NAME, product.name);
        prodMap.set(SqlFields_1.SqlFields.BRAND_ID, product.brand);
        prodMap.set(SqlFields_1.SqlFields.CAPACITY, product.capacity);
        switch (product.capacityUnit) {
            case 'גרם':
                prodMap.set(SqlFields_1.SqlFields.CAPACITY_UNIT, Number(SqlConsts_1.CapacityUnitConst.GRAM));
                break;
            case 'ליטר':
                prodMap.set(SqlFields_1.SqlFields.CAPACITY_UNIT, Number(SqlConsts_1.CapacityUnitConst.LITER));
                break;
            case 'ק"ג':
                prodMap.set(SqlFields_1.SqlFields.CAPACITY_UNIT, Number(SqlConsts_1.CapacityUnitConst.KILOGRAM));
                break;
            case '*' || 'יחידות' || 'יחידה':
                prodMap.set(SqlFields_1.SqlFields.CAPACITY_UNIT, Number(SqlConsts_1.CapacityUnitConst.UNIT));
                break;
            case 'מ"ל':
                prodMap.set(SqlFields_1.SqlFields.CAPACITY_UNIT, Number(SqlConsts_1.CapacityUnitConst.MILLILITER));
                break;
            default:
                prodMap.set(SqlFields_1.SqlFields.CAPACITY_UNIT, Number(SqlConsts_1.CapacityUnitConst.UNIT));
        }
        //prodMap.set(SqlFields.CATEGORY, product.category);
        return prodMap;
    };
    return StorageHandler;
}());
exports.StorageHandler = StorageHandler;
//# sourceMappingURL=StorageHandler.js.map