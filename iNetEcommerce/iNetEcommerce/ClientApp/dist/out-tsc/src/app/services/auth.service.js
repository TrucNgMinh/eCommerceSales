import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { LocalService } from './common/local.service';
import { LOGIN_STATUS, LOCAL_STORAGE_VARIABLE, ADMIN_CONST, API_ENDPOINT } from '../app.constants';
import { BaseService } from './common/base.service';
let AuthService = class AuthService extends BaseService {
    constructor(http, errorHandler, globalService) {
        super(http, errorHandler, globalService);
        this.http = http;
        this.errorHandler = errorHandler;
        this.globalService = globalService;
    }
    static isLoggedIn() {
        return LocalService.getLogStatus() === LOGIN_STATUS.logged_in && LocalService.getAccessToken();
    }
    static isAdmin() {
        const isAdmin = LocalService.getItem(LOCAL_STORAGE_VARIABLE.is_admin);
        return (isAdmin && isAdmin.toString()) === ADMIN_CONST;
    }
    login(data) {
        return this.post(API_ENDPOINT.LOG_IN, data, false);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map