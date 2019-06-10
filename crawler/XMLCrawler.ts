import {StoresConsts} from "../storagehandler/model/SqlConsts";
import {JsonStorageHandler} from "../storagehandler/impl/JsonStorageHandler";
import {XMLParser} from "./XMLParser";
import {XMLDownloader} from "../downloader/impl/XMLDownloader";
import {Product} from "../product/Product";
import {MySqlStorageHandler} from "../storagehandler/impl/MySqlStorageHandler";


export class XMLCrawler {

    private _storageHandler: JsonStorageHandler;

    private readonly parsersList = {
        'shufersal-prices': new XMLParser(StoresConsts.SHUFERSAL),
        'ramilevi-prices': new XMLParser(StoresConsts.RAMI_LEVI),
        'yenotbitan-prices': new XMLParser(StoresConsts.YENOT_BITAN)
    };

    constructor(){
        this._storageHandler = new JsonStorageHandler(false);
    }

    private findParser(url: string): XMLParser {
        for(let key in this.parsersList){
            if(url.includes(key)){
                return this.parsersList[key];
            }
        }
        return null;
    }

    public async crawl(files: string[]) {
        let newProducts = [];
        let filesToCrawl: string[] = files;
        while (filesToCrawl.length) {
            let currentFile = filesToCrawl.pop();
            let parser = this.findParser(currentFile);
            console.log("start to crawl in file:  " + currentFile + ", store id:" + parser.firmId);
            if (parser) {
                let jsonFile = XMLDownloader.downloadXMLFile(currentFile);
                let products = parser.parseNew(jsonFile);
                if (products) {
                    if (products.length != 0) {
                        Array.prototype.push.apply(newProducts, products);
                    }
                }
            }
        }

        await this._storageHandler.insert(newProducts, false);
        console.log("Finished parse " + newProducts.length + " new products");
        return;
    }


    public async update(files: string[]) {
        let updated = [];
        let filesToCrawl: string[] = files;
        while (filesToCrawl.length) {
            let currentFile = filesToCrawl.pop();
            let parser = this.findParser(currentFile);
            console.log("start to crawl in file:  " + currentFile + ", store id:" + parser.firmId);
            if (parser) {
                let jsonFile = XMLDownloader.downloadXMLFile(currentFile);
                let products = parser.parseUpdate(jsonFile);
                if (products) {
                    if (products.length != 0) {
                        Array.prototype.push.apply(updated, products);
                    }
                }
            }
        }

        await this._storageHandler.insert(updated, true);
        console.log("Finished update " + updated.length + " prices of products");
        //this._storageHandler.close();
        return;
    }

}