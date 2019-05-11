export class Product {
    private _barcode: number;
    private _price: number;
    private _link: string;
    private _updateDate: Date = new Date();

    constructor(barcode: number, price: number, link: string, updateDate: Date) {
        this._barcode = barcode;
        this._price = price;
        this._link = link;
        this._updateDate = updateDate;
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

    get link(): string {
        return this._link;
    }

    set link(value: string) {
        this._link = value;
    }

    get updateDate(): Date {
        return this._updateDate;
    }

    set updateDate(value: Date) {
        this._updateDate = value;
    }
}