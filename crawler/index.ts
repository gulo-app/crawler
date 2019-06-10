import {Crawler} from "./Crawler";
import * as path from "path";
import {JsonStorageHandler} from "../storagehandler/impl/JsonStorageHandler";
import {XMLCrawler} from "./XMLCrawler";
const TEST_OUTPUT = {filename: "pricestest.json", get path(){return path.join(__dirname, '../output', this.filename)}};
const RAMI_LEVI_XML = {filename: "ramilevi-prices.xml", get path(){return path.join(__dirname, '../data', this.filename)}};
const SHUFERSAL_XML = {filename: "shufersal-prices.xml", get path(){return path.join(__dirname, '../data', this.filename)}};
const YENOT_BITAN_XML = {filename: "yenotbitan-prices.xml", get path(){return path.join(__dirname, '../data', this.filename)}};


let run = (urls: string[]): void => {
    let xmlCrawler = new XMLCrawler();
    //xmlCrawler.crawl(urls);
    xmlCrawler.update(urls);
    //let crawler = new Crawler();
    //let products = crawler.crawl(urls);
    //let productsToUpdate = JsonStorageHandler.readProductsFromFile(TEST_OUTPUT.path);
    //let prodList = productsToUpdate.then(function(value) {
     //   crawler.update(value);
    //});

};

run([YENOT_BITAN_XML.path, SHUFERSAL_XML.path, RAMI_LEVI_XML.path]);


//'https://www.shufersal.co.il/online/he/A', 'https://www.rami-levy.co.il/category/start_buy'