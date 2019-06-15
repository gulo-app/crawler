import {NewProduct} from "../../../product/NewProduct";

const cheerio     =   require('cheerio');
const fs          =   require('fs');
const path        =   require('path');
import { Parser } from "../../Parser";
import {ParserUrls} from "../../ParserUrls";
import {StoresConsts} from "../../../storagehandler/model/SqlConsts";
import {Product} from "../../../product/Product";
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

    extractUrls(url: string, $: CheerioStatic): Array<string> {
        let urls = [];
        if(url.match('https://www.rami-levy.co.il/category/start_buy')) {
            let menu: CheerioElement[] = $('div.level1 > div > ul.level1 > li > a').toArray();
            for (let a of menu) {
                try {
                    let category = a.attribs['href'];
                    urls.push(this.baseUrl + category);
                } catch (e) {
                    continue;
                }
            }
            return urls;
        }
        else if(url.includes(this.categoryUrl)){
            let menu: CheerioElement[] = $('div.level2 > div > ul.level2 > li > a').toArray();
            for (let a of menu) {
                try {
                    let category = a.attribs['href'];
                    urls.push(this.baseUrl + category);
                } catch (e) {
                    continue;
                }
            }
            return urls;
        }
        else{
            return [];
        }
    }

    parse(url: string, $: CheerioStatic, updateMode: boolean, productsId: any): Array<NewProduct> {
        if(productsId ==  undefined)
            productsId = [];

        if(url.includes(this.categoryUrl)) {
            try {
                let productsList = $('div.product_item').toArray();
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


    private parseUpdate(productsList: CheerioElement[], productsId:[] = void 0) {
        let updatedProducts = [];
        for (let product of productsList) {
            let productsIdWithPrefix = productsId.map(function (value) {
                return '/files/products/big/' + value + '.jpg';
            });
            if (productsIdWithPrefix.includes(product.attribs['xml-data-src'])) {
                const $ = cheerio.load(product);
                let imgObj: string[] = $('div.image > img').attr('src').split("/");
                let barcode = imgObj[imgObj.length - 1].replace(".jpg", " ");
                let prodPrice = $('div.prodPrice').text().replace('\u20aa', " ");
                updatedProducts.push(
                    new Product(
                        Number(barcode),
                        Number(prodPrice),
                        StoresConsts.RAMI_LEVI
                    ));
            }
        }
        return updatedProducts;
    }


    private parseNew(products: CheerioElement[], url: string) {
        let parsedProducts = [];
        for (let product of products) {
            const $ = cheerio.load(product);

            let imgObj: string[] = $('div.image > a > img').attr('src').split('/');
            let barcode = imgObj[imgObj.length - 1].replace(".jpg", " ");
            let prodName = $('div.prodDescDiv > h3.prodName').text();
            let prodBrand = $('div.prodBrand').text().replace("מותג:", " ");
            let prodPrice = $('div.prodPrice').text().replace('\u20aa', " ").split("\n")[0].trim();; // remove the shekel sign
            let category = url.split('/');

            let nameToParse: string[] = prodName.split(" ");
            let capacityUnit;
            let capacity;
            let checkString = nameToParse[nameToParse.length - 1];

            if (Number.isNaN(Number.parseFloat(checkString))) {
                // only string, no numbers
                capacityUnit = checkString;
                capacity = nameToParse[nameToParse.length-2];
            }
            else{
                //string with num like '100גרם'
                capacity = parseFloat(checkString);
                capacityUnit = checkString.replace(new RegExp('/[0-9]/g'),'');
            }

            try {
                let newProduct = new NewProduct(
                    Number(barcode),
                    prodName,
                    prodPrice,
                    url,
                    capacity,
                    capacityUnit,
                    prodBrand,
                    category[category.length-1],
                    StoresConsts.RAMI_LEVI
                );
                parsedProducts.push(newProduct);
            } catch (e) {
                continue; //if a KeyError thrown
            }
        }

        return parsedProducts;
    }
}
