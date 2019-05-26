const moment = require('moment');

export class Product {
    protected _barcode: number;
    private _price: number;
    private _updateDate: string;
    private _firmId: number;

    constructor(barcode: number, price: number, firmId: number) {
        this._barcode = barcode;
        this._price = price;
        this._firmId = firmId;
        this._updateDate = moment().format('YYYY-MM-DD hh:mm:ss'); //new Date(Date.now()).toISOString();
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

    get updateDate(): string {
        return this._updateDate;
    }

    set updateDate(value: string) {
        this._updateDate = value;
    }

    get firmId(): number {
        return this._firmId;
    }

    set firmId(value: number) {
        this._firmId = value;
    }
}