export class UpdatedProduct {
    private _barcode: string;
    private _price: number;

    constructor(barcode: string, price: number) {
        this._barcode = barcode;
        this._price = price;
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
}