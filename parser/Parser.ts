import {ParserUrls} from "./ParserUrls";
import {Product} from "../crawler/Product";

export abstract class Parser {
   name:       string;
   url:        ParserUrls;
   products:   Array<Product>;

   protected constructor(name: string, url: ParserUrls){
      this.name = name;
      this.url = url;
      this.products = new Array<Product>();
   }

   abstract parse(): void;

   abstract extractUrls(): Array<string>;

}

/**
 * get information about products or get links of categories
 *
 * if root url -> gets categories
 * if category page -> get products prices
 *
 * parse by tags in html
 */


