const cheerio = require('cheerio');
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
                    let category = li.attribs['data-category'];
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
            // no products to parse in this page...
            return undefined;
        }
    }

    parseNew(products: CheerioElement[], url: string) {
        let parsedProducts = [];
        for (let product of products) {
            const $ = cheerio.load(product);
            let capacityInfo: string[] = $('div > div.textContainer > div > div.labelsListContainer > div > span:nth-child(1)')
                .text().split(' ');
            let  brand = $('div > div.textContainer > div > div.labelsListContainer > div > span:nth-child(2)').text();
            try {
                let newProduct = new Product(
                    product.attribs['data-product-code'].replace('P_', ''),
                    product.attribs['data-product-name'],
                    Number(product.attribs['data-product-price']),
                    url,
                    Number(capacityInfo[0]),
                    capacityInfo[1],
                    brand
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
                        product.attribs['data-product-code'].replace('P_', ''),
                        null,
                        product['data-product-price'],
                        null,
                        null,
                        null,
                        null
                    ));
            }
        }

        return updatedProducts;
    }



}


