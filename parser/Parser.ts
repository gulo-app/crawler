import {ParserUrls} from "./ParserUrls";
import {NewProduct} from "../crawler/NewProduct";

export abstract class Parser {
   //url:        ParserUrls;
   products:   Array<NewProduct>;

   protected constructor(){
      this.products = new Array<NewProduct>();
   }

   abstract parse(url: string, $: CheerioStatic, updateMode: boolean, productsId: any): Array<NewProduct>;

   abstract extractUrls(url: string, node: any): Array<string>;

}

/**
 * get information about products or get links of categories
 *
 * if root url -> gets categories
 * if category page -> get products prices
 *
 * parse by tags in html
 */


