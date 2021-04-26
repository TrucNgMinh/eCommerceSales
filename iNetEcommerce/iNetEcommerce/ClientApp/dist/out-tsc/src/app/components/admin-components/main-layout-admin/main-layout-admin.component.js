import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
let MainLayoutAdminComponent = class MainLayoutAdminComponent {
    constructor(router) {
        this.router = router;
    }
    ngAfterViewInit() {
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
    ngOnInit() {
        if (!AuthService.isLoggedIn()) {
            this.router.navigate(["login"]);
        }
    }
};
MainLayoutAdminComponent = __decorate([
    Component({
        selector: 'app-main-layout-admin',
        templateUrl: './main-layout-admin.component.html',
        styleUrls: ['./main-layout-admin.component.css']
    })
], MainLayoutAdminComponent);
export { MainLayoutAdminComponent };
//# sourceMappingURL=main-layout-admin.component.js.map