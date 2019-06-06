import * as fs from "fs";
var convert = require('xml-js');

/**
 * Download xml file and convert it to JSON.
 */
export class XMLDownloader {

    static downloadXMLFile(file: string) {
        let xmlFile =  fs.readFileSync(file, 'utf-8');
        let productsFile = convert.xml2json(xmlFile, {compact: true, spaces: 4});
        productsFile = !productsFile ? [] : JSON.parse(productsFile);
        return productsFile;
    }

}
