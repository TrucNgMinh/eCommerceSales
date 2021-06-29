import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Home } from 'src/app/models/home.model';
import UtilCommons from 'src/app/utils/util-common';
let HomeUserComponent = class HomeUserComponent {
    constructor(homeService, cd) {
        this.homeService = homeService;
        this.cd = cd;
        this.images = [];
        this.homeModel = new Home();
        this.isMobile = false;
    }
    ngAfterViewInit() {
        $("#readmore").on("click", function () {
            let dots = $("#dots");
            let moreText = $("#readmore-content");
            document.getElementById("readmore-content");
            let btnText = $("#readmore");
            if (dots.css("display") === "none") {
                dots.css("display", "inline");
                btnText.text("Xem thêm");
                moreText.css("display", "none");
            }
            else {
                dots.css("display", "none");
                btnText.text("Thu gọn");
                moreText.css("display", "inline");
            }
        });
        this.cd.detectChanges();
    }
    ngOnInit() {
        this.getHomeSetting();
        this.isMobile = UtilCommons.isMobile();
    }
    generateImageCasoul() {
        if (this.homeModel.banner1) {
            this.images.push({
                path: this.homeModel.banner1.toString()
            });
        }
        if (this.homeModel.banner2) {
            this.images.push({
                path: this.homeModel.banner2.toString()
            });
        }
        if (this.homeModel.banner3) {
            this.images.push({
                path: this.homeModel.banner3.toString()
            });
        }
        if (this.homeModel.banner4) {
            this.images.push({
                path: this.homeModel.banner4.toString()
            });
        }
    }
    getHomeSetting() {
        this.homeService.getSetting().subscribe((res) => {
            this.homeModel = res;
            this.generateImageCasoul();
            this.cd.detectChanges();
        });
    }
};
HomeUserComponent = __decorate([
    Component({
        selector: 'app-home-user',
        templateUrl: './home-user.component.html',
        styleUrls: ['./home-user.component.css']
    })
], HomeUserComponent);
export { HomeUserComponent };
//# sourceMappingURL=home-user.component.js.map