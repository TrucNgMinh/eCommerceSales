import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MainLayoutComponent = class MainLayoutComponent {
    constructor() { }
    ngOnInit() {
        $("#menu-icon-left").on("click", function () {
            let $navCustom = $(".navbar-custom");
            let $nav = $("#navigation");
            if ($navCustom.css("display") === "none") {
                $navCustom.attr('style', 'display:block !important');
                $nav.attr('style', 'display:block !important');
            }
            else {
                $navCustom.attr('style', 'display:none !important');
                $nav.attr('style', 'display:none !important');
            }
        });
    }
};
MainLayoutComponent = __decorate([
    Component({
        selector: 'app-main-layout',
        templateUrl: './main-layout.component.html',
        styleUrls: ['./main-layout.component.css']
    })
], MainLayoutComponent);
export { MainLayoutComponent };
//# sourceMappingURL=main-layout.component.js.map