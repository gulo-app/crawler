import { Parser } from "../Parser";
import {ParserUrls} from "../ParserUrls";
import {NewProduct} from "../../product/NewProduct";

export class YenotBitanParser extends Parser {


    constructor() {
        super();
    }


    extractUrls(): Array<string> {
        return undefined;
    }

    parse(url: string, node: any, updateMode: boolean, productsId: any): Array<NewProduct> {
        return undefined;
    }



}
