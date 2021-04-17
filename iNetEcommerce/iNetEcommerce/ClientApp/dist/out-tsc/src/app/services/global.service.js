import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let GlobalService = class GlobalService {
    constructor() {
        this.loader = new BehaviorSubject(false);
        this.signalRClientLoader = new BehaviorSubject(false);
        this.countLoading = 0;
    }
    loading() {
        this.countLoading++;
        this.loader.next(!!this.countLoading);
    }
    loaded() {
        this.countLoading--;
        this.loader.next(!!this.countLoading);
    }
};
GlobalService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], GlobalService);
export { GlobalService };
//# sourceMappingURL=global.service.js.map