import {NewProduct} from "../crawler/NewProduct";
import {SqlFields} from "./model/SqlFields";
import {CapacityUnitConst, StoresConsts} from "./model/SqlConsts";

export abstract class StorageHandler {

    isProd: boolean;

    protected constructor(isProd: boolean){
        this.isProd = isProd;
    }

    abstract openConnection(): any;

    abstract insert(products: Array<NewProduct>, firm: StoresConsts): void;

    public prepareNewProductMap(product: NewProduct): Map<string,object> {
        let prodMap = new Map();

        if (typeof product.barcode === "number") {
            prodMap.set(SqlFields.BARCODE, product.barcode);
        }

        prodMap.set(SqlFields.PRODUCT_NAME, product.name);
        prodMap.set(SqlFields.BRAND_ID, product.brand);
        prodMap.set(SqlFields.CAPACITY, product.capacity);

        switch (product.capacityUnit) {
            case 'גרם':
                prodMap.set(SqlFields.CAPACITY_UNIT, Number(CapacityUnitConst.GRAM));
                break;
            case 'ליטר':
                prodMap.set(SqlFields.CAPACITY_UNIT, Number(CapacityUnitConst.LITER));
                break;
            case 'ק"ג':
                prodMap.set(SqlFields.CAPACITY_UNIT, Number(CapacityUnitConst.KILOGRAM));
                break;
            case '*' || 'יחידות' || 'יחידה':
                prodMap.set(SqlFields.CAPACITY_UNIT, Number(CapacityUnitConst.UNIT));
                break;
            case 'מ"ל':
                prodMap.set(SqlFields.CAPACITY_UNIT, Number(CapacityUnitConst.MILLILITER));
                break;
            default:
                prodMap.set(SqlFields.CAPACITY_UNIT, Number(CapacityUnitConst.UNIT));
        }

        //prodMap.set(SqlFields.CATEGORY, product.category);

        return prodMap;
    }
}