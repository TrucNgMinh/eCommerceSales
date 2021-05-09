import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Editor } from 'ngx-editor';
import { Product } from 'src/app/models/product.model';
let AdminProductDetailComponent = class AdminProductDetailComponent {
    constructor(productGroupService) {
        this.productGroupService = productGroupService;
        this.editor = new Editor();
        this.html = '';
        this.productModel = new Product();
        this.productGroupDropList = [];
        this.productGroupDropListSelected = [];
        this.productGroupDropListSettings = {};
    }
    ngAfterViewInit() {
        this.getProductGroups();
    }
    ngOnDestroy() {
        this.editor.destroy();
    }
    ngOnInit() {
        this.productGroupDropListSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Chọn tất cả',
            unSelectAllText: 'Hủy chọn tất cả',
            itemsShowLimit: 4,
            allowSearchFilter: false
        };
        this.getProductGroups();
    }
    getProductGroups() {
        this.productGroupService.getProductGroups().subscribe((res) => {
            this.productGroupDropList = res;
        });
    }
    addProduct(form) {
        console.log("a");
    }
    onItemSelect(item) {
        console.log(item);
    }
    onSelectAll(items) {
        console.log(items);
    }
};
AdminProductDetailComponent = __decorate([
    Component({
        selector: 'app-admin-product-detail',
        templateUrl: './admin-product-detail.component.html',
        styleUrls: ['./admin-product-detail.component.css']
    })
], AdminProductDetailComponent);
export { AdminProductDetailComponent };
//# sourceMappingURL=admin-product-detail.component.js.map