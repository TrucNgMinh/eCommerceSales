import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AdminProductComponent = class AdminProductComponent {
    constructor(productGroupService) {
        this.productGroupService = productGroupService;
        this.productGroups = [];
    }
    ngOnInit() {
        this.productGroupService.getProductGroups().subscribe((data) => {
            console.log(data);
            this.productGroups = data;
            console.log(this.productGroups);
        });
    }
};
AdminProductComponent = __decorate([
    Component({
        selector: 'app-admin-product',
        templateUrl: './admin-product.component.html',
        styleUrls: ['./admin-product.component.css']
    })
], AdminProductComponent);
export { AdminProductComponent };
//# sourceMappingURL=admin-product.component.js.map