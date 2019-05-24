export class Product {
    private _name: string;
    private _barcode: string;
    private _price: number;
    private _url: string;
    private _capacity: number;
    private _capacityUnit: string;
    private _updateDate: number;


    constructor(barcode: string, name: string, price: number, url: string, capacity: number, capacityUnit: string) {
        this._barcode = barcode;
        this._name = name;
        this._price = price;
        this._url = url;
        this._capacity = capacity;
        this._capacityUnit = capacityUnit;
        this._updateDate = Date.now();
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get capacity(): number {
        return this._capacity;
    }

    set capacity(value: number) {
        this._capacity = value;
    }

    get capacityUnit(): string {
        return this._capacityUnit;
    }

    set capacityUnit(value: string) {
        this._capacityUnit = value;
    }

    get barcode(): string {
        return this._barcode;
    }

    set barcode(value: string) {
        this._barcode = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get updateDate(): number {
        return this._updateDate;
    }

    set updateDate(value: number) {
        this._updateDate = value;
    }
}