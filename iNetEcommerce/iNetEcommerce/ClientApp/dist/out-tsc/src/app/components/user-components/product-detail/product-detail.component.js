import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ImageModel } from 'src/app/models/image.model';
import { Product } from 'src/app/models/product.model';
let ProductDetailComponent = class ProductDetailComponent {
    constructor(productService, route, router) {
        this.productService = productService;
        this.route = route;
        this.router = router;
        this.product = new Product();
        this.images = [];
    }
    ngOnInit() {
        this.getQueryParams();
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