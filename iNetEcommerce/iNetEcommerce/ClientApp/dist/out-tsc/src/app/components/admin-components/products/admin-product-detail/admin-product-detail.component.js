import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ngEditorOptions } from 'src/app/app.constants';
import { Product } from 'src/app/models/product.model';
let AdminProductDetailComponent = class AdminProductDetailComponent {
    constructor(productGroupService, productService, router) {
        this.productGroupService = productGroupService;
        this.productService = productService;
        this.router = router;
        this.productModel = new Product();
        this.productGroupDropList = [];
        this.productGroupDropListSelected = [];
        this.productGroupDropListSettings = {};
        this.files = [];
        this.htmlContent = '';
    }
    ngAfterViewInit() {
        this.getProductGroups();
    }
    ngOnDestroy() {
    }
    ngOnInit() {
        this.editorConfig = ngEditorOptions;
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
        if (!form.valid)
            return;
        this.productModel.productGroups = this.productGroupDropListSelected.map(({ id }) => id);
        console.log(this.productModel.productGroups);
        this.productService.addEditProduct(this.productModel).subscribe((res) => {
            this.router.navigate(['/admin/admin-product']);
        });
    }
    onSelect(event) {
        console.log(event);
        this.files.push(...event.addedFiles);
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