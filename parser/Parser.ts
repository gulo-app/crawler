import {ParserUrls} from "./ParserUrls";
import {Product} from "../crawler/Product";

export abstract class Parser {
   //url:        ParserUrls;
   products:   Array<Product>;

   protected constructor(){
      this.products = new Array<Product>();
   }

   abstract parse(url: string, $: CheerioStatic, updateMode: boolean, productsId: any): Array<Product>;

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


