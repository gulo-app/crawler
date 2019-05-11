import {Product} from "../crawler/Product";

export abstract class StorageHandler {

    isProd: boolean;

    protected constructor(isProd: boolean){
        this.isProd = isProd;
    }

    abstract openConnection(): any;

    abstract insert(products: Array<Product>, firm: string): void;
}