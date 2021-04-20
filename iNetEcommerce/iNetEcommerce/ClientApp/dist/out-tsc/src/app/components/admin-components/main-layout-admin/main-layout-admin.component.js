import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MainLayoutAdminComponent = class MainLayoutAdminComponent {
    constructor() { }
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
        jsFile.forEach((item) => {
            var $object = document.getElementById(item.name);
            if ($object) {
                $object.remove();
            }
            let script = document.createElement("script");
            script.setAttribute("id", item.name);
            script.setAttribute("src", item.src);
            document.body.appendChild(script);
        });
    }
    ngOnInit() {
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
export const jsFile = [
    {
        name: "slimScroll",
        src: "../assets/js/jquery.slimscroll.js"
    },
    {
        name: "metisMenu",
        src: "../assets/js/metisMenu.min.js"
    },
    {
        name: "jqueryApp",
        src: "../assets/js/jquery.app.js"
    },
    {
        name: "jqueryCore",
        src: "../assets/js/jquery.core.js"
    }
];
//# sourceMappingURL=main-layout-admin.component.js.map