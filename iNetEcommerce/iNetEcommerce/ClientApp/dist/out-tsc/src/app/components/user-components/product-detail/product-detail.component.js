import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ImageModel } from 'src/app/models/image.model';
import { Product } from 'src/app/models/product.model';
import UtilCommons from 'src/app/utils/util-common';
let ProductDetailComponent = class ProductDetailComponent {
    constructor(productGroupService, productService, route) {
        this.productGroupService = productGroupService;
        this.productService = productService;
        this.route = route;
        this.product = new Product();
        this.images = [];
        this.productGroups = [];
        this.isMobile = false;
    }
    ngOnInit() {
        this.getQueryParams();
        this.getProductGroups();
        this.isMobile = UtilCommons.isMobile();
    }
    getProductGroups() {
        this.productGroupService.getProductGroups().subscribe((res) => {
            this.productGroups = res;
        });
    }
    generateImageCasoul() {
        this.product.images.forEach(element => {
            this.images.push(new ImageModel(element));
        });
    }
    getProduct(id) {
        this.productService.getProductById(id).subscribe((result) => {
            this.product = result;
            this.generateImageCasoul();
        });
    }
    getQueryParams() {
        this.route.params.subscribe(params => {
            this.productId = +params['id'];
            this.getProduct(this.productId);
        });
    }
};
ProductDetailComponent = __decorate([
    Component({
        selector: 'app-product-detail',
        templateUrl: './product-detail.component.html',
        styleUrls: ['./product-detail.component.css']
    })
], ProductDetailComponent);
export { ProductDetailComponent };
//# sourceMappingURL=product-detail.component.js.map