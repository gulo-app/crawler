//const cheerio     =   require('@types/cheerio');
import { Parser } from "../Parser";
import {ParserUrls} from "../ParserUrls";
import {Product} from "../../crawler/Product";

export class ShufersalParser extends Parser {

    private baseUrl: string;
    private categoryUrl: string;

    constructor() {
        super();
        this.baseUrl = ParserUrls.SHUFERSAL_HOME;
        this.categoryUrl = ParserUrls.SHUFERSAL_CATEGORY;
        //TODO: map_cat_to_gulo
        //{'milk': 'A01'}
    }

    extractUrls(url: string, $: CheerioStatic): Array<string> {
        if (!url.includes(this.categoryUrl)) {
            let urls = [];
            let menu: CheerioElement[] = $('ul#secondMenu1 > li').toArray();
            for (let li of menu) {
                try {
                    let category = li['data-category'];
                    urls.push(this.categoryUrl + '/' + category);
                } catch (e) {
                    continue;
                }
            }
            return urls;
        } else
            return [];
    }

    parse(url: string, $: CheerioStatic, updateMode: boolean = false, productsId: any = void 0): Array<Product> {
        if(productsId ==  undefined)
            productsId = [];

        if(url.includes(this.categoryUrl)) {
            try {
                let productsList = $('li.miglog-prod.miglog-sellingmethod-by_unit').toArray();
                if (updateMode)
                    return this.parseUpdate(productsList, productsId);

                return this.parseNew(productsList, url);
            } catch (e) {
                return undefined;
            }
        }
        else {
            // nothing to parse...
            return undefined;
        }
    }

    parseNew(products: CheerioElement[], url: string) {
        let parsedProducts = [];
        for (let product of products) {
            try {
                let newProduct = new Product(
                    (<string>product['data-product-code']).replace('P_', ''),
                    product['data-product-name'],
                    product['data-product-price'],
                    url,
                    void 0,//product.find('div', {'class': 'labelsListContainer'}).text,
                    void 0
                );
                parsedProducts.push(newProduct);
            } catch (e) {
                continue; //if a KeyError thrown
            }
        }

        return parsedProducts;
    }

    parseUpdate(products: CheerioElement[], productsBarcodeList: [] = void 0) {
        let updatedProducts = [];
        for(let product of products){
            let productsIdWithPrefix = products.map(function (value) {
               return 'P_'+ value;
            })
            if(productsIdWithPrefix.includes(product['data-product-code'])) {
                updatedProducts.push(
                    new Product(
                        (<string>product['data-product-code']).replace('P_', ''),
                        void 0,
                        product['data-product-price'],
                        void 0,
                        void 0,
                        void 0
                    ));
            }
        }

        return updatedProducts;
    }



}


