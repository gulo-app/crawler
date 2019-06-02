import {NewProduct} from "../product/NewProduct";
import {ShoppingCartField, SqlFields} from "./model/SqlFields";
import {CapacityUnitConst, StoresConsts} from "./model/SqlConsts";
import {StorageUtils} from "./StorageUtils";
import {Product} from "../product/Product";

export abstract class StorageHandler {

    isProd: boolean;

    protected constructor(isProd: boolean){
        this.isProd = isProd;
    }

    abstract openConnection(): any;

    abstract async insert(products: Array<Product>, updateMode: boolean): Promise<void>;

    public prepareNewProductMap(product: NewProduct): Map<string,string> {
        let prodMap = this.prepareBasicProduct(product);

        if (typeof product === Product.name) {
            return prodMap;
        }

        prodMap.set(SqlFields.PRODUCT_NAME, product.name);
        prodMap.set(SqlFields.BRAND_NAME, product.brand);
        if(product.capacity === NaN) {
            // @ts-ignore
            product.capacity(0);
        }
        prodMap.set(SqlFields.CAPACITY, product.capacity.toString());
        prodMap.set(ShoppingCartField.LINK, product.url);
        prodMap.set(SqlFields.CAPACITY_UNIT, StorageUtils.capacityUnitHandler(product.capacityUnit).toString());
        prodMap.set(SqlFields.CATEGORY, StorageUtils.categoriesHandler(product.category).toString());

        return prodMap;
    }

    public prepareBasicProduct(product: Product): Map<string,string>{
        let prodMap = new Map();

        if (typeof product.barcode === "number") {
            prodMap.set(SqlFields.BARCODE, product.barcode);
        }

        prodMap.set(ShoppingCartField.PRICE, product.price);
        prodMap.set(ShoppingCartField.UPDATE_TIME, product.updateDate);
        prodMap.set(ShoppingCartField.FIRM_ID, product.firmId.toString());
        return prodMap;
    }

}