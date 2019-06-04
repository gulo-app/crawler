import { Parser } from "../Parser";
import {ParserUrls} from "../ParserUrls";
import {NewProduct} from "../../product/NewProduct";

export class YenotBitanParser extends Parser {

    private baseUrl: string;
    private categoryUrl: string;

    constructor() {
        super();
    }

    extractUrls(url: string, $: CheerioStatic): Array<string> {
        return undefined;
    }

    parse(url: string, $: CheerioStatic, updateMode: boolean, productsId: any): Array<NewProduct> {
        return undefined;
    }






}
