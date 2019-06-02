import {StorageHandler} from "../StorageHandler";
import {Product} from "../../product/Product";
import * as path from "path";
import {NewProduct} from "../../product/NewProduct";
import * as fs from "fs";
const PRODUCTS_OUTPUT = {filename: "products.json", get path(){return path.join(__dirname, '../../output', this.filename)}};
const PRICES_OUTPUT = {filename: "prices.json", get path(){return path.join(__dirname, '../../output', this.filename)}};

export class JsonStorageHandler extends StorageHandler{

    productsList: Array<NewProduct>;
    pricesList: Array<Product>;

    constructor(isProd: boolean) {
        super(isProd);
        this.productsList = new Array<NewProduct>();
        this.pricesList = new Array<Product>();
    }

    async insert(products: Array<Product>, updateMode: boolean): Promise<void> {
        return undefined;
    }

    openConnection(): any {
    }

    async appendProductsToFile(products) {
        try{
            let file_products =  fs.readFileSync(PRODUCTS_OUTPUT.path, 'utf-8');
            file_products = !file_products ? [] : JSON.parse(file_products);

            file_products = file_products.concat(products);
            fs.writeFileSync(PRODUCTS_OUTPUT.path, JSON.stringify(file_products), 'utf-8');
        } catch(e){
            console.log(e);
        }
    }
}