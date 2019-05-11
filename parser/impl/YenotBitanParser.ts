import { Parser } from "../Parser";
import {ParserUrls} from "../ParserUrls";

class YenotBitanParser extends Parser {


    constructor(name: string, url: ParserUrls) {
        super(name, url);
    }

    parse(): void {
    }

    extractUrls(): Array<string> {
        return undefined;
    }

}
