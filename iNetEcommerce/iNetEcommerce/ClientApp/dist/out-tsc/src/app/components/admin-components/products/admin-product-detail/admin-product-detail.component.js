import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ngEditorOptions } from 'src/app/app.constants';
import { Product } from 'src/app/models/product.model';
let AdminProductDetailComponent = class AdminProductDetailComponent {
    constructor(productGroupService, productService, router, route, cd) {
        this.productGroupService = productGroupService;
        this.productService = productService;
        this.router = router;
        this.route = route;
        this.cd = cd;
        this.productModel = new Product();
        this.productGroupDropList = [];
        this.productGroupDropListSelected = [];
        this.productGroupDropListSettings = {};
    }
    ngAfterViewInit() {
        this.getProductGroups();
    }
    ngOnDestroy() {
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.productId = +params['id'];
            if (this.productId > 0) {
                this.productService.getProductAdmin(this.productId).subscribe((res) => {
                    this.productModel = res;
                    console.log(this.productModel);
                    this.getProductGroups();
                });
            }
            else {
                this.getProductGroups();
            }
        });
        this.editorConfig = ngEditorOptions;
        this.productGroupDropListSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Chọn tất cả',
            unSelectAllText: 'Hủy chọn tất cả',
            itemsShowLimit: 4,
            allowSearchFilter: true,
            searchPlaceholderText: 'Tìm kiếm'
        };
    }
    getProductGroups() {
        this.productGroupService.getProductGroups().subscribe((res) => {
            this.productGroupDropList = res;
            if (this.productId > 0 && this.productGroupDropList.length > 0) {
                this.productGroupDropListSelected = this.productGroupDropList.filter(x => this.productModel.productGroups.includes(x.id));
                this.cd.detectChanges();
            }
        });
    }
    addProduct(form) {
        if (!form.valid)
            return;
        this.productModel.productGroups = this.productGroupDropListSelected.map(({ id }) => id);
        this.productService.addEditProduct(this.productModel).subscribe((res) => {
            this.router.navigate(['/admin/admin-product']);
        });
    }
    onChangeProductImage(event, imageIndex) {
        const filesUpload = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(filesUpload);
        switch (imageIndex) {
            case 1:
                this.productModel.image1 = filesUpload;
                break;
            case 2:
                this.productModel.image2 = filesUpload;
                break;
            case 3:
                this.productModel.image3 = filesUpload;
                break;
            case 4:
                this.productModel.image4 = filesUpload;
                break;
            default:
                break;
        }
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