import {StorageHandler} from "../StorageHandler";
import {Product} from "../../product/Product";
import * as path from "path";
import {NewProduct} from "../../product/NewProduct";
import * as fs from "fs";
import {resolve} from "url";
import {rejects} from "assert";
import {StorageUtils} from "../StorageUtils";
import {StoresConsts} from "../model/SqlConsts";
const PRODUCTS_OUTPUT = {filename: "products.json", get path(){return path.join(__dirname, '../../output', this.filename)}};
const PRICES_OUTPUT = {filename: "prices.json", get path(){return path.join(__dirname, '../../output', this.filename)}};
const TEST_OUTPUT = {filename: "pricestest.json", get path(){return path.join(__dirname, '../../output', this.filename)}};

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

        if(updateMode){
            for(let currProd of products){
                let barcode = currProd.barcode;
                let shopping_cart_firm_id = currProd.firmId;
                let price = currProd.price;

                let updatedProd = {barcode, price, shopping_cart_firm_id};
                updateProducts.push(updatedProd)
            }

            await this.appendProductsToFile(updateProducts, PRICES_OUTPUT.path);
            return;
        }
        else {
            for(let currProd of products){
                let barcode = currProd.barcode;
                let product_name = currProd.product_name;
                let brand_name = currProd.brand;
                let capacity = currProd.capacity;
                let capacity_units_name = StorageUtils.capacityUnitHandler(currProd.capacity_unit);
                let category_id: Number;
                if(currProd.firmId == StoresConsts.SHUFERSAL)
                    category_id = StorageUtils.shufersalCategoriesHandler(currProd.category);
                else category_id = 0;
                let productNew = {barcode, product_name, brand_name, capacity, capacity_units_name, category_id};
                newProductsToInsert.push(productNew);
            }

            await this.appendProductsToFile(newProductsToInsert, PRODUCTS_OUTPUT.path);
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

    static async readProductsFromFile(path) {
        return new Promise(function(resolve, reject) {
            let file_products = fs.readFileSync(path, 'utf-8');
            file_products = !file_products ? [] : JSON.parse(file_products);
            resolve(file_products);
        });
    }

    /*async insertPrices(products: Array<NewProduct>, updateMode: boolean): Promise<void> {
        let newProductsToInsert = [];
        let updateProducts = [];

        if(updateMode){
            for(let currProd of products){
                let barcode = currProd.barcode;
                let shopping_cart_firm_id = currProd.firmId;
                let price = currProd.price;

                let updatedProd = {barcode, price, shopping_cart_firm_id};
                updateProducts.push(updatedProd)
            }

            await this.appendProductsToFile(updateProducts, PRICES_OUTPUT.path);
            return;
        }
        else {
            for(let currProd of products){
                let barcode = currProd.barcode;
                let product_name = currProd.product_name;
                let brand_name = currProd.brand;
                let capacity = currProd.capacity;
                let capacity_units_name = StorageUtils.capacityUnitHandler(currProd.capacity_unit);
                let category_id: Number;
                if(currProd.firmId == StoresConsts.SHUFERSAL)
                    category_id = StorageUtils.shufersalCategoriesHandler(currProd.category);
                else category_id = 0;
                let productNew = {barcode, product_name, brand_name, capacity, capacity_units_name, category_id};
                newProductsToInsert.push(productNew);
            }

            await this.appendProductsToFile(newProductsToInsert, PRODUCTS_OUTPUT.path);
            return;
        }
    }
*/
}