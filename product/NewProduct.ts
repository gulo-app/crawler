import {Product} from "./Product";

export class NewProduct extends Product{
    private _product_name: string;
    private _capacity: number;
    private _capacity_unit: string;
    private _brand: string;
    private _category: string;
    private _url: string;

    constructor(barcode: number, name: string, price: number, url: string, capacity: number,
                capacityUnit: string, brand: string, category: string, firm: number) {
        super(barcode, price, firm);
        this._product_name = name;
        this._capacity = capacity;
        this._capacity_unit = capacityUnit;
        this._brand = brand;
        this._category = category;
        this._url = url;
    }

    get product_name(): string {
        return this._product_name;
    }

    set product_name(value: string) {
        this._product_name = value;
    }

    get capacity(): number {
        return this._capacity;
    }

    set capacity(value: number) {
        this._capacity = value;
    }

    get capacity_unit(): string {
        return this._capacity_unit;
    }

    set capacity_unit(value: string) {
        this._capacity_unit = value;
    }

    get brand(): string {
        return this._brand;
    }

    set brand(value: string) {
        this._brand = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
}