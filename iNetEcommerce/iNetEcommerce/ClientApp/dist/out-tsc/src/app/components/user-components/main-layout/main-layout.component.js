import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MainLayoutComponent = class MainLayoutComponent {
    constructor(productGroupService) {
        this.productGroupService = productGroupService;
        this.productGroups = [];
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
        $(".has-submenu").on("click", function (evt) {
            let $subMenuClicked = $(evt.currentTarget);
            let $subMenuMegaMenu = $subMenuClicked.find(".submenu");
            if ($subMenuClicked.hasClass("open")) {
                $subMenuClicked.removeClass("open");
                $subMenuMegaMenu.removeClass("open");
            }
            else {
                $subMenuClicked.addClass("open");
                $subMenuMegaMenu.addClass("open");
            }
        });
    }
    ngOnInit() {
        this.productGroupService.getProductGroups().subscribe((data) => {
            console.log(data);
            this.productGroups = data;
            console.log(this.productGroups);
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