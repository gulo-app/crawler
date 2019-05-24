import {Parser} from "../parser/Parser";
import {StorageHandler} from "../storagehandler/StorageHandler";
import {MySqlStorageHandler} from "../storagehandler/impl/MySqlStorageHandler";
import {ShufersalParser} from "../parser/impl/ShufersalParser";
import {Downloader} from "../downloader/Downloader";
import {Product} from "./Product";
const cheerio = require('cheerio');

export class Crawler {

    private _parsersList: Array<Parser>;
    private _storageHandler: StorageHandler;

    private readonly parsersList = {
        'shufersal.co.il/online/he/A': new ShufersalParser(),
        'shufersal.co.il/online/he/c': new ShufersalParser(),
    }

    constructor(){
        this._storageHandler = new MySqlStorageHandler(false);
    }

     private findParser(url: string): Parser {
        for(let key in this.parsersList){
            if(url.includes(key)){
                return this.parsersList[key];
            }
        }

        return null;
    }

    public async crawl(urls: string[]): Promise<Array<Product>> {
        let newProducts = [];
        let urlsToCrawl: string[] = urls;
        while (urlsToCrawl.length){
            console.log(urlsToCrawl.length);
            let currentUrl = urlsToCrawl.pop();
            let parser = this.findParser(currentUrl);
            if(parser){
                let html = await Downloader.downloadHtml(currentUrl);
                const $ = await cheerio.load(html);
                if($){
                    let products = parser.parse(currentUrl, $, false, undefined);
                    if(products){
                        newProducts.push(products);
                    }
                    // @ts-ignore
                    urlsToCrawl.push(parser.extractUrls(currentUrl, $));
                }
            }
        }

        return newProducts;
    }

    public async update(products: Promise<Array<Product>>): Promise<void> {
        let uniqueUrls = [];
        let updated = [];
        // @ts-ignore
        for(let url of products){
            if(uniqueUrls.isPrototypeOf(url['url'])){
                uniqueUrls[url['url']].append(url['id']);
            }
            else {
                uniqueUrls[url['url']] = [url['id']];
            }
        }

        for(let url of uniqueUrls){
            let parser = this.findParser(url);
            if(parser){
                const $ = await Downloader.downloadHtml(url);
                if($){
                    updated.push(parser.parse(url, $, true, uniqueUrls[url]));
                }
            }
        }

        this._storageHandler.insert(updated, "1");
        return;
    }

}





//get ParserUrls.getAll()
//foreach url in urls:
//  if there is parser in parser list for url
//          parse()
//  Parser.extractUrls
//extractUrls products and create new Product
// add product to storageHandlerList.add
//
//storage.insert