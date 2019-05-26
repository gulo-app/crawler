import {StorageHandler} from "../StorageHandler";
import mysql = require('mysql');
import {Pool, queryCallback, QueryFunction} from "mysql";
import {NewProduct} from "../../product/NewProduct";
import {StoresConsts} from "../model/SqlConsts";
import {ProductCategoryField, ShoppingCartField, SqlFields} from "../model/SqlFields";
import {Product} from "../../product/Product";
//const IS_PROD  =  process.env.IS_PROD;

export class MySqlStorageHandler extends StorageHandler{

    private _conn: Pool;

    constructor(isProd: boolean) {
        super(isProd);

        if(isProd){
            console.log("running on remote mySQL");
        }

        this._conn = this.openConnection();
    }

    openConnection(): Pool {
        return mysql.createPool({
            host: this.isProd ? '35.205.128.46' : 'localhost',
            user: "gulo",
            password: "shenkar",
            database: "gulo",
            connectionLimit: 1,
            supportBigNumbers: true,
            multipleStatements: true
        });
    }

    async insert(products: Array<NewProduct>, firm: StoresConsts, updateMode: boolean): Promise<void> {
        if(products.length == 0) {
            console.log("nothing to insert, products list is empty")
            return;
        }

        for (let product of products) {
            let productMap: Map<string, string> = this.prepareNewProductMap(product);

            try {
                if (!updateMode) {
                    let newBrand;
                    let results: [] = await this.query(`SELECT brand_id FROM brands WHERE brand_name = "שופרסל";`);
                       /*     function (error, rows) {
                        if(error) throw error;
                        else{
                            setResults(rows);
                        }
                    });*/

                    // @ts-ignore

                    if(results.length > 0){
                        newBrand = results.pop();
                        console.log(newBrand);
                    }

                    await this.query(
                        `INSERT INTO products
                      (barcode, product_name, brand_id, capacity, capacity_unit_id, verifiedCounter)
                       VALUES
                      (${Number(productMap.get(SqlFields.BARCODE))}, "${productMap.get(SqlFields.PRODUCT_NAME)}", 
                        ${Number(newBrand)}, ${Number(productMap.get(SqlFields.CAPACITY))}, 
                        ${Number(productMap.get(SqlFields.CAPACITY_UNIT))}, 0)
                       ON DUPLICATE KEY UPDATE verifiedCounter = verifiedCounter + 1;
                    `);

                    await this.query(
                        `INSERT INTO product_category (${ProductCategoryField.BARCODE}, ${ProductCategoryField.CATEGORY_ID})
                        VALUES
                        (${productMap.get(SqlFields.BARCODE)}, ${productMap.get(SqlFields.CATEGORY)})
                    `);
                }

                await this.query(
                    `INSERT INTO shopping_cart_prices
                      (${ShoppingCartField.FIRM_ID} ,${ShoppingCartField.BARCODE}, ${ShoppingCartField.PRICE}, ${ShoppingCartField.LINK}, ${ShoppingCartField.UPDATE_TIME})
                       VALUES
                      (${Number(productMap.get(ShoppingCartField.FIRM_ID))}, 
                       ${productMap.get(ShoppingCartField.BARCODE)},
                       ${Number(productMap.get(ShoppingCartField.PRICE))}, 
                      "${productMap.get(ShoppingCartField.LINK)}",
                      "${productMap.get(ShoppingCartField.UPDATE_TIME)}")
                       ON DUPLICATE KEY UPDATE 
                       ${ShoppingCartField.PRICE} = ${productMap.get(ShoppingCartField.PRICE)},
                       ${ShoppingCartField.UPDATE_TIME} = "${productMap.get(ShoppingCartField.UPDATE_TIME)}";
                `);
            }
            catch (e) {
                console.log(e);
                continue;
            }
        }

        console.log(`update ${products.length} products price successfully. firm: ${firm}`);
        return;
    }

    private async query(query): Promise<[]> {
        return new Promise((resolve,reject) => {
            this._conn.query(query, (err, rows) => {
                if(err){
                    //console.log(err);
                    reject(err);
                }
                resolve(rows);
            })
        })
    }


    public close(): void {
        this._conn.end();
    }

}


