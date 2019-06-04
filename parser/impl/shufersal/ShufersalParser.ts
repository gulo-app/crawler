import {StoresConsts} from "../../../storagehandler/model/SqlConsts";

const cheerio = require('cheerio');
import { Parser } from "../../Parser";
import {ParserUrls} from "../../ParserUrls";
import {NewProduct} from "../../../product/NewProduct";
import {Product} from "../../../product/Product";

export class ShufersalParser extends Parser {

    private baseUrl: string;
    private categoryUrl: string;

    constructor() {
        super();
        this.baseUrl = ParserUrls.SHUFERSAL_HOME;
        this.categoryUrl = ParserUrls.SHUFERSAL_CATEGORY;
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

    parse(url: string, $: CheerioStatic, updateMode: boolean = false, productsId: any = void 0): Array<NewProduct> {
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
            let brand_name = $('div > div.textContainer > div > div.labelsListContainer > div > span:nth-child(2)').text();
            let category: string[] = url.split('/');
            let barcode = product.attribs['data-product-code'].replace('P_', '');
            let product_name = product.attribs['data-product-product_name'];
            let product_price = product.attribs['data-product-price']
            try {
                let newProduct = new NewProduct(
                    Number(barcode),
                    product_name,
                    Number(product_price),
                    url,
                    Number(capacityInfo[0]),
                    capacityInfo[1],
                    brand_name,
                    category[category.length-1],
                    StoresConsts.SHUFERSAL
                );

                parsedProducts.push(newProduct);
            } catch (e) {
                continue; //if a KeyError thrown
            }
        }

        return parsedProducts;
    }

    //TODO: check if works - test
    parseUpdate(products: CheerioElement[], productsBarcodeList: [] = void 0) {
        let updatedProducts = [];
        let productsIdWithPrefix = productsBarcodeList.map(function (value) {
            return 'P_'+ value;
        });

        for(let product of products){
            if(productsIdWithPrefix.includes(product.attribs['data-product-code'])) {
                updatedProducts.push(
                    new Product(
                        Number(product.attribs['data-product-code'].replace('P_', '')),
                        Number(product.attribs['data-product-price']),
                        StoresConsts.SHUFERSAL
                    ));
            }
        }

        return updatedProducts;
    }



}


