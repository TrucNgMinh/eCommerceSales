import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomeAdminComponent = class HomeAdminComponent {
    constructor() { }
    ngAfterViewInit() {
        $('.colorpicker-default').colorpicker({
            format: 'hex'
        });
        $('.colorpicker-rgba').colorpicker();
    }
    ngOnInit() {
    }
};
HomeAdminComponent = __decorate([
    Component({
        selector: 'app-home-admin',
        templateUrl: './home-admin.component.html',
        styleUrls: ['./home-admin.component.css']
    })
], HomeAdminComponent);
export { HomeAdminComponent };
//# sourceMappingURL=home-admin.component.js.map