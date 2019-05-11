import { Parser } from "../Parser";
import {ParserUrls} from "../ParserUrls";

class RamiLevyParser extends Parser {

    constructor(name: string, url: ParserUrls) {
        super(name, url);
    }

    parse(): void {
        //do parse
    }

    extractUrls(): Array<string> {
        return undefined;
    }
}