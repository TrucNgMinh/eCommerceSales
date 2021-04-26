import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../app.constants';
import { BaseService } from './common/base.service';
let ProductGroupService = class ProductGroupService extends BaseService {
    constructor(http, errorHandler, globalService) {
        super(http, errorHandler, globalService);
        this.http = http;
        this.errorHandler = errorHandler;
        this.globalService = globalService;
    }
    addEditProductGroup(model) {
        return this.post(API_ENDPOINT.ADD_EDIT_PRODUCT_GROUP, model, true);
    }
    deleteProductGroup(model) {
        return this.post(API_ENDPOINT.DELETE_PRODUCT_GROUP, model, true);
    }
    getProductGroups() {
        var result = this.get(API_ENDPOINT.GET_PRODUCT_GROUP, null, true);
        return result;
    }
};
ProductGroupService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductGroupService);
export { ProductGroupService };
//# sourceMappingURL=product-group.service.js.map