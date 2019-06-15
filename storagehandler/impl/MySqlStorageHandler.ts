import {StorageHandler} from "../StorageHandler";
import mysql = require('mysql');
import {Pool} from "mysql";
import {Product} from "../../product/Product";

/**
 * Storage handler for MySql Database.
 * Implement update mode for updating products prices
 */
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

    async insert(products: Array<Product>, updateMode: boolean): Promise<void> {
        if (products.length == 0) {
            console.log("nothing to insert, products list is empty")
            return;
        }

        let updatedProducts = [];
        for (let product of products) {
            let updated = this.prepareBasicProduct(product);
            updatedProducts.push(updated);
        }
        if (updatedProducts) {
            for (let currProd of updatedProducts) {
                if(!currProd["barcode"] || !currProd["price"] || !currProd["shopping_cart_firm_id"])
                    continue;

                try {
                    await this.query(
                        `INSERT INTO shopping_cart_prices (barcode ,price, shopping_cart_firm_id, updatedAt) VALUES
                      (${currProd["barcode"]},${currProd["price"]},${currProd["shopping_cart_firm_id"]}, NOW())
                      ON DUPLICATE KEY UPDATE price=${currProd["price"]}, updatedAt=NOW()`);
                } catch (e) {
                    console.log("failed to insert product: " + currProd + " due to: " + e);
                }
            }
        }

        console.log(`update ${updatedProducts.length} products prices successfully.`);
        this.close();
        return;
    }

    private async query(query): Promise<[]> {
        return new Promise((resolve,reject) => {
            this._conn.query(query, (err, rows) => {
                if(err){
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


