import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductsComponent = class ProductsComponent {
    constructor(productService) {
        this.productService = productService;
        this.products = [];
    }
    ngOnInit() {
        this.getProducts();
    }
    getProducts() {
        this.productService.getProducts().subscribe((res) => {
            this.products = res;
            this.products = this.products.slice(0, 3);
        });
    }
};
ProductsComponent = __decorate([
    Component({
        selector: 'app-products',
        templateUrl: './products.component.html',
        styleUrls: ['./products.component.css']
    })
], ProductsComponent);
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map