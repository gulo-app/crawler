import {StoresConsts} from "../storagehandler/model/SqlConsts";
import {JsonStorageHandler} from "../storagehandler/impl/JsonStorageHandler";
import {XMLParser} from "../parser/XMLParser";
import {XMLDownloader} from "../downloader/impl/XMLDownloader";
import * as fs from "fs";
import * as path from "path";

/**
 * crawler for handle stores xml products files.
 */
export class XMLCrawler {

    private _storageHandler: JsonStorageHandler;

    private readonly parsersList = {
        'shufersal': new XMLParser(StoresConsts.SHUFERSAL),
        'ramilevi': new XMLParser(StoresConsts.RAMI_LEVI),
        'yenotbitan': new XMLParser(StoresConsts.YENOT_BITAN)
    };

    constructor(isProd: boolean){
        this._storageHandler = new JsonStorageHandler(isProd);
    }

    private findParser(url: string): XMLParser {
        for(let key in this.parsersList){
            if(url.includes(key)){
                return this.parsersList[key];
            }
        }
        return null;
    }

    /**
     * reads products details
     * @param files - array of file paths
     */
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


    /**
     * reads products prices and barcodes for updating out storage
     * @param files - array of file paths
     */
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
        return;
    }


    /**
     * List all files in a directory recursively
     */
    getAllXmlFiles = (dir, filelist) => {
        var fs = fs || require('fs'),
            files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function(file) {
            if (fs.statSync(dir + '\\' + file).isDirectory()) {
                filelist = this.getAllXmlFiles(path.join(dir, file), filelist);
            }
            else {
                filelist.push(path.join(dir,file));
            }
        }.bind(this));
        return filelist;
    };

}