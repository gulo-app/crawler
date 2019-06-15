import * as path from "path";
import {XMLCrawler} from "./crawler/XMLCrawler";
const DATA_XML = {dirName: "xml-data", get path(){return path.join(__dirname, '/', this.dirName)}};
const node_env = process.env.NODE_ENV;


let run = (): void => {
    let isProd: boolean = !!node_env.match("PROD");

    let xmlCrawler = new XMLCrawler(isProd);
    let filesList = xmlCrawler.getAllXmlFiles(DATA_XML.path, []);
    xmlCrawler.update(filesList);
};

run();