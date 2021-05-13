export class Blog {
    constructor(bid: number) {
        this.id =  bid;
    }
    id: number = 0;
    userId: number = 0;
    title: string = "";
    body: string = "";
    abstract: string = "";
    image: string = "";
    dateTimeCreate: Date = new Date();
    imageUploaded: File = new File([], '');
}