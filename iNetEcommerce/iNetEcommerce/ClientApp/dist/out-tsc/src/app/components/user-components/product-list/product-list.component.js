import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductListComponent = class ProductListComponent {
    constructor(productGroupService) {
        this.productGroupService = productGroupService;
    }
    ngOnInit() {
        this.getProductGroups();
    }
    getProductGroups() {
        this.productGroupService.getProductGroups().subscribe((res) => {
            this.productGroups = res;
        });
    }
};
ProductListComponent = __decorate([
    Component({
        selector: 'app-product-list',
        templateUrl: './product-list.component.html',
        styleUrls: ['./product-list.component.css']
    })
], ProductListComponent);
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map