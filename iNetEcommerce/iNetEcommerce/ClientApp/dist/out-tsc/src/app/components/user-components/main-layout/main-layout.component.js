import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { jsFileForMainLayout } from 'src/app/app.constants';
let MainLayoutComponent = class MainLayoutComponent {
    constructor(productGroupService) {
        this.productGroupService = productGroupService;
        this.productGroups = [];
    }
    ngAfterViewInit() {
        jsFileForMainLayout.forEach((item) => {
            let $item = document.getElementById(item.name);
            if ($item) {
                $item.remove();
            }
            let script = document.createElement("script");
            script.setAttribute("id", item.name);
            script.setAttribute("src", item.src);
            document.body.appendChild(script);
        });
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
        this.getProductGroups();
    }
    getProductGroups() {
        this.productGroupService.getProductGroups().subscribe((res) => {
            this.productGroups = res;
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