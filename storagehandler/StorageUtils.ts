import {CapacityUnitConst, CategoriesConst} from "./model/SqlConsts";
import {ShufersalFieldsMap} from "../parser/impl/shufersal/ShufersalFieldsMap";

/**
 * this class handle product fields from crawler.
 * @return sqlConsts
 */
export class StorageUtils {

    public static categoriesHandler(category: string): CategoriesConst {
        for (let key in ShufersalFieldsMap) {
            if (category.match(key)) {
                return ShufersalFieldsMap[key];
            }
        }

        return CategoriesConst.GENERAL;
    }

    public static capacityUnitHandler(unit: string): CapacityUnitConst {
        switch (unit) {
            case 'גרם':
                return CapacityUnitConst.GRAM;
                break;
            case 'ליטר':
                return CapacityUnitConst.LITER;
                break;
            case 'ק"ג' || 'לקג':
                return CapacityUnitConst.KILOGRAM;
                break;
            case '*' || 'יחידות' || 'יחידה' || 'יחי':
                return CapacityUnitConst.UNIT;
                break;
            case 'מ"ל':
                return CapacityUnitConst.ML;
                break;
            default:
                return CapacityUnitConst.UNIT;
        }
    }


}