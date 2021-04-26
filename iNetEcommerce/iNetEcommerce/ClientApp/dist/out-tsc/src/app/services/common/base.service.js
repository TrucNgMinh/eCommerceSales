var BaseService_1;
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, } from '@angular/common/http';
import { shareReplay, timeout, catchError } from 'rxjs/operators';
import { API_URL_PREFIX, API_HOST, REQUEST_TIMEOUT } from '../../app.constants';
import { LocalService } from './local.service';
import { map, } from 'rxjs/operators';
let BaseService = BaseService_1 = class BaseService {
    constructor(http, errorHandler, globalService) {
        this.http = http;
        this.errorHandler = errorHandler;
        this.globalService = globalService;
        this.caches = {};
        this.apiHost = API_HOST;
        this.apiUrlPrefix = API_URL_PREFIX;
        this.headers = new HttpHeaders(BaseService_1.defaultHeader);
    }
    createAPIURL(path) {
        return this.apiHost + this.apiUrlPrefix + path;
    }
    get(url, params, loader = true, cache = false, options = {}) {
        this.loadToken();
        if (cache && this.caches[url]) {
            if (loader) {
                this.globalService.loading();
            }
            return this.caches[url];
        }
        const fullUrl = this.createAPIURL(url);
        const lastOptions = Object.assign({ headers: this.headers, params: params }, options);
        let request;
        request = this.http.get(fullUrl, lastOptions)
            .pipe(catchError((err) => {
            return this.errorHandler.handleError(err);
        }), shareReplay(1), timeout(REQUEST_TIMEOUT));
        if (cache) {
            this.caches[url] = request;
        }
        return request;
    }
    download(url, param = undefined) {
        this.get(url, param, true, false, { observe: 'response', responseType: 'blob' }).pipe(map((res) => {
            return {
                fileName: res.headers.get('fileName'),
                file: res.body
            };
        }))
            .subscribe((res) => {
            var FileSaver = require('file-saver');
            FileSaver.saveAs(res.file, res.fileName);
        });
    }
    post(url, params, loader = true) {
        this.loadToken();
        const fullUrl = this.createAPIURL(url);
        return this.http.post(fullUrl, params, { headers: this.headers })
            .pipe(catchError((err) => {
            return this.errorHandler.handleError(err);
        }), timeout(REQUEST_TIMEOUT));
    }
    put(url, params, loader = true) {
        this.loadToken();
        const fullUrl = this.createAPIURL(url);
        this.globalService.loading();
        return this.http.put(fullUrl, params, { headers: this.headers })
            .pipe(catchError((err) => {
            return this.errorHandler.handleError(err);
        }), timeout(REQUEST_TIMEOUT));
    }
    remove(url, params, loader = true) {
        this.loadToken();
        const fullUrl = this.createAPIURL(url);
        this.globalService.loading();
        return this.http.request('delete', fullUrl, { headers: this.headers, body: params })
            .pipe(catchError((err) => {
            return this.errorHandler.handleError(err);
        }), timeout(REQUEST_TIMEOUT));
    }
    putFormData(url, params, loader = true) {
        this.loadToken(true);
        const body = this.parseFormdata(params);
        const fullUrl = this.createAPIURL(url);
        return this.http.put(fullUrl, body, { headers: this.headers })
            .pipe(catchError((err) => {
            return this.errorHandler.handleError(err);
        }), timeout(REQUEST_TIMEOUT));
    }
    postFormData(url, params, loader = true) {
        this.loadToken(true);
        const body = this.parseFormdata(params);
        const fullUrl = this.createAPIURL(url);
        return this.http.post(fullUrl, body, { headers: this.headers })
            .pipe(catchError((err) => {
            return this.errorHandler.handleError(err);
        }), timeout(REQUEST_TIMEOUT));
    }
    loadToken(isForm = false) {
        const token = LocalService.getAccessToken();
        if (token == '' || !token) {
            this.headers = new HttpHeaders(isForm ? BaseService_1.formdataHeader : BaseService_1.defaultHeader);
        }
        else {
            this.headers = new HttpHeaders(Object.assign(Object.assign({}, isForm ? BaseService_1.formdataHeader : BaseService_1.defaultHeader), { 'Authorization': `Bearer ${token}` }));
        }
    }
    parseFormdata(model) {
        const formdata = new FormData();
        Object.keys(model || {}).forEach(p => {
            if (model[p]) {
                if (Array.isArray(model[p])) {
                    model[p].forEach(q => {
                        formdata.append(p + '[]', q);
                    });
                }
                else {
                    formdata.append(p, model[p]);
                }
            }
        });
        return formdata;
    }
};
BaseService.defaultHeader = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Max-Age': '3600',
    'api-supported-versions': '1.0'
};
BaseService.formdataHeader = {
    'enctype': 'multipart/form-data'
};
BaseService = BaseService_1 = __decorate([
    Injectable()
], BaseService);
export { BaseService };
//# sourceMappingURL=base.service.js.map