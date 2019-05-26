import {NewProduct} from "../../product/NewProduct";

const cheerio     =   require('cheerio');
const fs          =   require('fs');
const path        =   require('path');
import { Parser } from "../Parser";
import {ParserUrls} from "../ParserUrls";
const TMP_FILE    =   {filename: 'tmp_products.json', get path(){return path.join(__dirname, './output', this.filename)}};
const OUTPUT      =   {filename: 'output.json', get path(){return path.join(__dirname, '../output', this.filename)}};


export class RamiLevyParser extends Parser {

    private baseUrl: string;
    private categoryUrl: string;

    constructor() {
        super();
        this.baseUrl = ParserUrls.RAMI_LEVI_HOME;
        this.categoryUrl = ParserUrls.RAMI_LEVI_CATEGORY;
    }

    extractUrls(url: string, node: any): Array<string> {
        return undefined;
    }

    parse(url: string, $: CheerioStatic, updateMode: boolean, productsId: any): Array<NewProduct> {
        return undefined;
    }


}
