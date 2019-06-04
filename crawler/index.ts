import {Crawler} from "./Crawler";
import * as path from "path";
import {JsonStorageHandler} from "../storagehandler/impl/JsonStorageHandler";
const TEST_OUTPUT = {filename: "pricestest.json", get path(){return path.join(__dirname, '../output', this.filename)}};


let run = (urls: string[]): void => {
    let crawler = new Crawler();
    //let products = crawler.crawl(urls);
    let products = JsonStorageHandler.readProductsFromFile(TEST_OUTPUT.path);
    let prodList = products.then(function(value) {
        crawler.update(value);
    });

}

run([ 'https://www.shufersal.co.il/online/he/A']);


//'https://www.shufersal.co.il/online/he/A', 'https://www.rami-levy.co.il/category/start_buy'