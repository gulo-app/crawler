import {Product} from "./Product";

export class NewProduct extends Product{
    private _name: string;
    private _capacity: number;
    private _capacityUnit: string;
    private _brand: string;
    private _category: string;
    private _url: string

    constructor(barcode: number, name: string, price: number, url: string, capacity: number,
                capacityUnit: string, brand: string, category: string, firm: number) {
        super(barcode, price, firm);
        this._name = name;
        this._capacity = capacity;
        this._capacityUnit = capacityUnit;
        this._brand = brand;
        this._category = category;
        this._url = url;
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