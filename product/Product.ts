const moment = require('moment');

export class Product {
    protected _barcode: number;
    private _price: number;
    private _firmId: number;

    constructor(barcode: number, price: number, firmId: number) {
        this._barcode = barcode;
        this._price = price;
        this._firmId = firmId;
    }

    get barcode(): number {
        return this._barcode;
    }

    set barcode(value: number) {
        this._barcode = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get firmId(): number {
        return this._firmId;
    }

    set firmId(value: number) {
        this._firmId = value;
    }
}