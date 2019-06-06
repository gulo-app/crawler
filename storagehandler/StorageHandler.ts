import {NewProduct} from "../product/NewProduct";
import {ShoppingCartField, SqlFields} from "./model/SqlFields";
import {StorageUtils} from "./StorageUtils";
import {Product} from "../product/Product";

export abstract class StorageHandler {

    isProd: boolean;

    protected constructor(isProd: boolean){
        this.isProd = isProd;
    }

    abstract openConnection(): any;

    abstract async insert(products: Array<Product>, updateMode: boolean): Promise<void>;

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

    public prepareBasicProduct(product: Product): {}{
        let barcode: Number;
        if (/^\d+$/.test(product.barcode.toString())) {
            barcode = product.barcode;
        }
        else return undefined;
        let shopping_cart_firm_id: Number = product.firmId;
        let price: Number = product.price;

        let updatedProd = {barcode, price, shopping_cart_firm_id};
        return updatedProd;
    }

}