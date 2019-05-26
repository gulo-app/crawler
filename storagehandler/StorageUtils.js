"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqlConsts_1 = require("./model/SqlConsts");
var ShufersalFieldsMap_1 = require("../parser/impl/shufersal/ShufersalFieldsMap");
/**
 * this class handle product fields from crawler.
 * @return sqlConsts
 */
var StorageUtils = /** @class */ (function () {
    function StorageUtils() {
    }
    StorageUtils.categoriesHandler = function (category) {
        for (var key in ShufersalFieldsMap_1.ShufersalFieldsMap) {
            if (category.match(key)) {
                return ShufersalFieldsMap_1.ShufersalFieldsMap[key];
            }
        }
        return SqlConsts_1.CategoriesConst.GENERAL;
    };
    StorageUtils.capacityUnitHandler = function (unit) {
        switch (unit) {
            case 'גרם':
                return SqlConsts_1.CapacityUnitConst.GRAM;
                break;
            case 'ליטר':
                return SqlConsts_1.CapacityUnitConst.LITER;
                break;
            case 'ק"ג' || 'לקג':
                return SqlConsts_1.CapacityUnitConst.KILOGRAM;
                break;
            case '*' || 'יחידות' || 'יחידה' || 'יחי':
                return SqlConsts_1.CapacityUnitConst.UNIT;
                break;
            case 'מ"ל':
                return SqlConsts_1.CapacityUnitConst.ML;
                break;
            default:
                return SqlConsts_1.CapacityUnitConst.UNIT;
        }
    };
    return StorageUtils;
}());
exports.StorageUtils = StorageUtils;
//# sourceMappingURL=StorageUtils.js.map