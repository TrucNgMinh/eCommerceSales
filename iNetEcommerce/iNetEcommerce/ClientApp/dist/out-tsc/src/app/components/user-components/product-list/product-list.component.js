import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductListComponent = class ProductListComponent {
    constructor(productGroupService, productService, router, route) {
        this.productGroupService = productGroupService;
        this.productService = productService;
        this.router = router;
        this.route = route;
        this.productGroups = [];
        this.productsSrc = [];
        this.products = [];
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
        this.getQueryParam();
        this.getProductGroups();
    }
    getQueryParam() {
        this.route.params.subscribe(params => {
            this.productGroupId = +params['id'];
        });
    }
    getProductGroups() {
        this.productGroupService.getProductGroups().subscribe((res) => {
            this.productGroups = res;
            this.productService.getProducts().subscribe((prods) => {
                this.productsSrc = prods;
                this.loadByGroup(this.productGroupId);
            });
        });
    }
    loadByGroup(groupId) {
        if (groupId == 0) {
            this.products = this.productsSrc;
        }
        else {
            this.products = this.productsSrc.filter(p => p.productGroups.includes(groupId));
        }
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