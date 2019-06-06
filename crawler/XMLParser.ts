import {NewProduct} from "../product/NewProduct";
import {Product} from "../product/Product";
import {StoresConsts} from "../storagehandler/model/SqlConsts";

export class XMLParser {

    public readonly firmId: number;

    constructor(firmId) {
        this.firmId = firmId;
    }

    public parseNew(jsonFile): Array<NewProduct> {
        let productsList: Array<NewProduct> = new Array<NewProduct>();
        let items: [];
        switch (this.firmId) {
            case StoresConsts.RAMI_LEVI:
                items = jsonFile.Root.Items.Item;
                break;
            case StoresConsts.YENOT_BITAN:
                items = jsonFile.Root.Items.Item;
                break;
            default:
                items = jsonFile.root.Items.Item;
                break;
        }
        try {
            for (let item of items) {
                let barcode = item["ItemCode"]["_text"];
                let name = item["ItemName"]["_text"];
                let brand;
                if(item["ManufacturerName"])
                    brand = item["ManufacturerName"]["_text"];
                else brand = "-";
                let capacity = item["Quantity"]["_text"];
                let capacityUnit = item["UnitOfMeasure"]["_text"];
                let price = item["ItemPrice"]["_text"];

                let product: NewProduct = new NewProduct(
                    barcode,
                    name,
                    price,
                    null,
                    capacity,
                    capacityUnit,
                    brand,
                    null,
                    this.firmId);

                productsList.push(product);
            }
        }catch (e) {
            console.log(e);
            //keep parsing...
        }

        return productsList;
    }


    parseUpdate(jsonFile): Array<Product> {
        let productsList = [];
        let items: [];
        switch (this.firmId) {
            case StoresConsts.RAMI_LEVI:
                items = jsonFile.Root.Items.Item;
                break;
            case StoresConsts.YENOT_BITAN:
                items = jsonFile.Root.Items.Item;
                break;
            default:
                items = jsonFile.root.Items.Item;
                break;
        }
        for (let item of items) {
            let barcode = item["ItemCode"]["_text"];
            let price = item["ItemPrice"]["_text"];

            let product: Product = new Product(
                barcode,
                price,
                this.firmId);

            productsList.push(product);
        }
        return productsList;
    }
}
