"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var TMP_FILE = { filename: 'tmp_products.json', get path() { return path.join(__dirname, './output', this.filename); } };
var OUTPUT = { filename: 'output.json', get path() { return path.join(__dirname, '../output', this.filename); } };
/*
export class RamiLevyParser extends Parser {

    rootPage: string;

    constructor(url: ParserUrls) {
        super(url);
        this.rootPage = this.url.toString() + ParserUrls.RAMI_LEVI_HOME;
    }

    extractUrls(url: string, node: any): Array<string> {
        return undefined;
    }

    parse(url: string, node: any, updateMode: boolean, productsId: any): void {
    }

    //parse(): void {
      ///  let rootHTML = this.download(this.rootPage);
    //}

    //extractUrls(): Array<string> {

      //  return undefined;
    //}

    /!*download(url: string): any {
        return new Promise((resolve, reject) => {
            request(url, function (err, response, body) {
                if (err) return reject(err);
                return resolve(body);
            });
        })
    }*!/

}*/
//# sourceMappingURL=RamiLevyParser.js.map