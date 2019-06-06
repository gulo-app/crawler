"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StorageHandler = /** @class */ (function () {
    function StorageHandler(isProd) {
        this.isProd = isProd;
    }
    /*public prepareNewProductMap(product: NewProduct): Map<string,string> {
        let prodMap = this.prepareBasicProduct(product);

        if (typeof product === Product.name) {
            return prodMap;
        }

        prodMap.set(SqlFields.PRODUCT_NAME, product.product_name);
        prodMap.set(SqlFields.BRAND_NAME, product.brand);
        if(product.capacity === NaN) {
            // @ts-ignore
            product.capacity(0);
        }
        prodMap.set(SqlFields.CAPACITY, product.capacity.toString());
        prodMap.set(ShoppingCartField.LINK, product.url);
        prodMap.set(SqlFields.CAPACITY_UNIT, StorageUtils.capacityUnitHandler(product.capacity_unit).toString());
        prodMap.set(SqlFields.CATEGORY, StorageUtils.shufersalCategoriesHandler(product.category).toString());

        return prodMap;
    }*/
    StorageHandler.prototype.prepareBasicProduct = function (product) {
        var barcode;
        if (/^\d+$/.test(product.barcode.toString())) {
            barcode = product.barcode;
        }
        else
            return undefined;
        var shopping_cart_firm_id = product.firmId;
        var price = product.price;
        var updatedProd = { barcode: barcode, price: price, shopping_cart_firm_id: shopping_cart_firm_id };
        return updatedProd;
    };
    return StorageHandler;
}());
exports.StorageHandler = StorageHandler;
//# sourceMappingURL=StorageHandler.js.map