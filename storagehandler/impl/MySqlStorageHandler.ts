import {StorageHandler} from "../StorageHandler";
import mysql = require('mysql');
import {Pool, QueryFunction} from "mysql";
import {Product} from "../../crawler/Product";
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

    insert(products: Array<Product>, firm: string): void {
        //insert all products from list
        if(products.length == 0) {
            console.log("nothing to insert, products list is empty")
            return;
        }

        //check if firm exist and get id from sql;

        for (let product of products) {
            //do onDuplicateKey
            //option: insert 1 by 1 OR build query for all products together
        }
    }

    private async sqlQuery(query): Promise<QueryFunction> {
        return new Promise((resolve,reject) => {
            this._conn.query(query, (err, cb) => {
                if(err){
                    //console.log(err);
                    reject(err);
                }
                resolve(cb);
            })
        })
    }

}


