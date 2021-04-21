import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { datatableLanguageOptions } from 'src/app/app.constants';
let AdminProductComponent = class AdminProductComponent {
    constructor(productGroupService) {
        this.productGroupService = productGroupService;
        this.productGroups = [];
        this.dtOptions = {};
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
        const that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            order: [1, 'desc'],
            processing: true,
            language: datatableLanguageOptions,
            ajax: (dataTablesParameters, callback) => {
                that.productGroupService.getProductGroups().subscribe((resp) => {
                    that.productGroups = resp;
                    callback({
                        recordsTotal: that.productGroups.length,
                        recordsFiltered: that.productGroups.slice(10, that.productGroups.length),
                        data: []
                    });
                });
            },
            columns: [{ data: 'id' }, { data: 'name' }, { data: 'unit' }]
        };
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