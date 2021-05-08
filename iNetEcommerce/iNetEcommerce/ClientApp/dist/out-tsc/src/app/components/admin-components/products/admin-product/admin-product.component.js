import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs-compat';
import { datatableLanguageOptions } from 'src/app/app.constants';
import { ProductGroup } from 'src/app/models/product-group.model';
import { Product } from 'src/app/models/product.model';
let AdminProductComponent = class AdminProductComponent {
    constructor(productGroupService, modalService) {
        this.productGroupService = productGroupService;
        this.modalService = modalService;
        this.productGroups = [];
        this.products = [];
        this.dtOptions = {};
        this.dtTrigger = new Subject();
        this.productGroupModel = new ProductGroup();
        this.productModel = new Product();
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            language: datatableLanguageOptions
        };
        this.getProductGroups();
    }
    getProductGroups() {
        this.productGroupService.getProductGroups().subscribe((res) => {
            this.productGroups = res;
            this.dtTrigger.next();
        });
    }
    addProductGroup(form) {
        console.log("a");
        this.modalService.dismissAll();
    }
    ngOnDestroy() {
        this.dtTrigger.unsubscribe();
    }
    triggerModal(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
            console.log("modal opened");
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