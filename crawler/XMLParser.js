"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewProduct_1 = require("../product/NewProduct");
var Product_1 = require("../product/Product");
var SqlConsts_1 = require("../storagehandler/model/SqlConsts");
var XMLParser = /** @class */ (function () {
    function XMLParser(firmId) {
        this.firmId = firmId;
    }
    XMLParser.prototype.parseNew = function (jsonFile) {
        var productsList = new Array();
        var items;
        switch (this.firmId) {
            case SqlConsts_1.StoresConsts.RAMI_LEVI:
                items = jsonFile.Root.Items.Item;
                break;
            case SqlConsts_1.StoresConsts.YENOT_BITAN:
                items = jsonFile.Root.Items.Item;
                break;
            default:
                items = jsonFile.root.Items.Item;
                break;
        }
        try {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var barcode = item["ItemCode"]["_text"];
                var name_1 = item["ItemName"]["_text"];
                var brand = void 0;
                if (item["ManufacturerName"])
                    brand = item["ManufacturerName"]["_text"];
                else
                    brand = "-";
                var capacity = item["Quantity"]["_text"];
                var capacityUnit = item["UnitOfMeasure"]["_text"];
                var price = item["ItemPrice"]["_text"];
                var product = new NewProduct_1.NewProduct(barcode, name_1, price, null, capacity, capacityUnit, brand, null, this.firmId);
                productsList.push(product);
            }
        }
        catch (e) {
            console.log(e);
            //keep parsing...
        }
        return productsList;
    };
    XMLParser.prototype.parseUpdate = function (jsonFile) {
        var productsList = [];
        var items;
        switch (this.firmId) {
            case SqlConsts_1.StoresConsts.RAMI_LEVI:
                items = jsonFile.Root.Items.Item;
                break;
            case SqlConsts_1.StoresConsts.YENOT_BITAN:
                items = jsonFile.Root.Items.Item;
                break;
            default:
                items = jsonFile.root.Items.Item;
                break;
        }
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            var barcode = item["ItemCode"]["_text"];
            var price = item["ItemPrice"]["_text"];
            var product = new Product_1.Product(barcode, price, this.firmId);
            productsList.push(product);
        }
        return productsList;
    };
    return XMLParser;
}());
exports.XMLParser = XMLParser;
//# sourceMappingURL=XMLParser.js.map