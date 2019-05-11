import {Parser} from "../parser/Parser";
import {StorageHandler} from "../storagehandler/StorageHandler";
import {MySqlStorageHandler} from "../storagehandler/impl/MySqlStorageHandler";
import {ParserUrls} from "../parser/ParserUrls";

class Crawler {

    private _parsersList: Array<Parser>;
    private _storageHandler: StorageHandler;

    constructor(){
        this._storageHandler = new MySqlStorageHandler(false);
    }

    public crawl(urls: ParserUrls): void {
        //get ParserUrls.getAll()
        //foreach url in urls:
        //  if there is parser in parser list for url
        //          parse()
        //  Parser.extractUrls
        //extractUrls products and create new Product
        // add product to storageHandlerList.add
        //
        //storage.insert
    }


}