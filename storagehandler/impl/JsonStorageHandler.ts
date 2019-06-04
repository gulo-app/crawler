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

    async insert(products: Array<NewProduct>, updateMode: boolean): Promise<void> {
        let newProductsToInsert = [];
        let updateProducts = [];
        for(let currProd of products){
            let barcode = currProd.barcode;
            let product_name = currProd.product_name;
            let brand_name = currProd.brand;
            let capacity = currProd.capacity;
            let capacity_units_name = currProd.capacity_unit;

            let shopping_cart_firm_id = currProd.firmId;
            let price = currProd.price;
            let link = currProd.url;

            let productNew = {barcode, product_name, brand_name, capacity, capacity_units_name};
            newProductsToInsert.push(productNew);
            let updatedProd = {barcode, shopping_cart_firm_id, price, link};
            updateProducts.push(updatedProd)
        }
        if(updateMode) return;
        else {
            await this.appendProductsToFile(newProductsToInsert, PRODUCTS_OUTPUT.path);
            await this.appendProductsToFile(updateProducts, PRICES_OUTPUT.path);
            return;
        }
    }

    openConnection(): any {
    }

    async appendProductsToFile(products, path) {
        try{
            let file_products =  fs.readFileSync(path, 'utf-8');
            file_products = !file_products ? [] : JSON.parse(file_products);

            file_products = file_products.concat(products);
            fs.writeFileSync(path, JSON.stringify(file_products), 'utf-8');
        } catch(e){
            console.log(e);
        }
    }
}