import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs-compat';
import { datatableLanguageOptions } from 'src/app/app.constants';
import { ProductGroup } from 'src/app/models/product-group.model';
let AdminProductComponent = class AdminProductComponent {
    constructor(productGroupService, modalService, productService) {
        this.productGroupService = productGroupService;
        this.modalService = modalService;
        this.productService = productService;
        this.productGroups = [];
        this.products = [];
        this.dtOptions = {};
        this.dtTrigger = new Subject();
        this.productGroupModel = new ProductGroup();
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            paging: true,
            language: datatableLanguageOptions,
        };
        this.getProductGroups(true);
    }
    getProductGroups(isTrigger = false) {
        this.productGroupService.getProductGroups().subscribe((res) => {
            this.productGroups = res;
            if (isTrigger)
                this.dtTrigger.next();
            this.getProducts();
        });
    }
    getProducts() {
        this.productService.getProducts().subscribe((res) => {
            this.products = res;
        });
    }
    addProductGroup(form) {
        if (form.invalid) {
            return;
        }
        this.productGroupService.addEditProductGroup(this.productGroupModel).subscribe((res) => {
            this.getProductGroups();
            this.modalService.dismissAll();
        });
    }
    removeProductGroup(id) {
        let model = new ProductGroup();
        model.id = id;
        this.productGroupService.deleteProductGroup(model).subscribe((res) => {
            this.getProductGroups();
        });
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