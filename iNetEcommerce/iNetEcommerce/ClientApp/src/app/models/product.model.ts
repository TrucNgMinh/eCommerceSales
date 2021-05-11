export class Product {
    id : any;
    name: any;
    unit: any;
    price: any;
    sellPrice: any;
    sellPriceMax: any;
    content: any;
    abstract: any;
    productGroups: number[] = [];
    images: string[] = [];
    
    image1: File = new File([], "");
    image2: File = new File([], "");
    image3: File = new File([], "");
    image4: File = new File([], "");
}
