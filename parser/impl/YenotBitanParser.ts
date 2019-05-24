import { Parser } from "../Parser";
import {ParserUrls} from "../ParserUrls";
import {Product} from "../../crawler/Product";

export class YenotBitanParser extends Parser {


    constructor() {
        super();
    }


    extractUrls(): Array<string> {
        return undefined;
    }

    parse(url: string, node: any, updateMode: boolean, productsId: any): Array<Product> {
        return undefined;
    }



}
