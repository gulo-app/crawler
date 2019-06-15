import {Parser} from "../parser/Parser";
import {ShufersalParser} from "../parser/impl/shufersal/ShufersalParser";
import {NewProduct} from "../product/NewProduct";
import {RamiLevyParser} from "../parser/impl/ramilevy/RamiLevyParser";
import {JsonStorageHandler} from "../storagehandler/impl/JsonStorageHandler";
import {RequestDownloader} from "../downloader/impl/RequestDownloader";

const cheerio = require('cheerio');

export class Crawler {

    private _storageHandler: JsonStorageHandler;
    private _finishedParseList: Array<string>;

    private readonly parsersList = {
        'shufersal.co.il/online/he/A': new ShufersalParser(),
        'shufersal.co.il/online/he/c': new ShufersalParser(),
        'https://www.rami-levy.co.il/category/start_buy': new RamiLevyParser(),
        'https://www.rami-levy.co.il/default.asp?catid=': new RamiLevyParser()
    };

    constructor(isProd: boolean){
        this._storageHandler = new JsonStorageHandler(isProd);
        this._finishedParseList = new Array<string>();
    }

     private findParser(url: string): Parser {
        for(let key in this.parsersList){
            if(url.includes(key)){
                return this.parsersList[key];
            }
        }
        return null;
    }

    public async crawl(urls: string[]): Promise<Array<NewProduct>> {
        let newProducts = [];
        let urlsToCrawl: string[] = urls;
        while (urlsToCrawl.length){
            let currentUrl = urlsToCrawl.pop();
            if(this._finishedParseList.indexOf(currentUrl) != -1) continue;
            let parser = this.findParser(currentUrl);
            console.log("start to crawl in url:  " + currentUrl);
            if(parser){
                let html = await new RequestDownloader().downloadHtml(currentUrl);
                //let html = await new SeleniumDownloader().downloadHtml(currentUrl);
                const $ = await cheerio.load(html);
                if($){
                    let products = parser.parse(currentUrl, $, false, undefined);
                    this._finishedParseList.push(currentUrl);
                    if(products){
                        if(products.length != 0) {
                            Array.prototype.push.apply(newProducts, products);
                        }
                    }
                    Array.prototype.push.apply(urlsToCrawl, parser.extractUrls(currentUrl, $));
                }
            }
        }

        await this._storageHandler.insert(newProducts, false);
        console.log("Finished parse " + newProducts.length + " new products");
        return newProducts;
    }


    public async update(products) {
        let uniqueUrls = {};
        let updated = [];
        // @ts-ignore
        for(let product of products){
            if(!uniqueUrls.hasOwnProperty(product['link'])){
                uniqueUrls[product['link']] = [];
                uniqueUrls[product['link']].push(product['barcode']);
            }
            else {
                uniqueUrls[product['link']].push(product['barcode']);
            }
        }

        for(let url in uniqueUrls){
            let parser = this.findParser(url);
            if(parser){
                let html = await new RequestDownloader().downloadHtml(url);
                //const html = await new SeleniumDownloader().downloadHtml(url);
                const $ = cheerio.load(html);
                if($){
                    Array.prototype.push.apply(updated, parser.parse(url, $, true, uniqueUrls[url]));
                }
            }
        }

        await this._storageHandler.insert(updated, true);
        console.log("Finished parse and update " + updated.length + " prices of products");
        return;
    }

    public close(): void {
        //this._storageHandler.close();
    }

}





//get ParserUrls.getAll()
//foreach url in urls:
//  if there is parser in parser list for url
//          parse()
//  Parser.extractUrls
//extractUrls products and create new NewProduct
// add product to storageHandlerList.add
//
//storage.insert