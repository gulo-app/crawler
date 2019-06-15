import {NewProduct} from "../product/NewProduct";

export abstract class Parser {

   products:   Array<NewProduct>;

   protected constructor(){
      this.products = new Array<NewProduct>();
   }

   /**
    * this method should implement the parsing of html tags in your url
    * @param url  - url to crawl
    * @param $    - cheerio element (html body)
    * @param updateMode - true for update prices only, false for new products
    * @param productsId - for update mode, list of barcodes to update
    */
   abstract parse(url: string, $: CheerioStatic, updateMode: boolean, productsId: any): Array<NewProduct>;

   /**
    * this method should implement the parsing of urls pages with products.
    * e.g: parse the categories html pages (that has products inside)
    * @param url
    * @param $
    */
   abstract extractUrls(url: string, $: CheerioStatic): Array<string>;

}

