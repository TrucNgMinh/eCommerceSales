import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Home } from 'src/app/models/home.model';
let HomeAdminComponent = class HomeAdminComponent {
    constructor(homeService) {
        this.homeService = homeService;
        this.homeModel = new Home();
    }
    ngAfterViewInit() {
        $('.colorpicker-default').colorpicker({
            format: 'hex'
        });
        $('.colorpicker-rgba').colorpicker();
    }
    ngOnInit() {
        this.getHomeSetting();
    }
    getHomeSetting() {
        this.homeService.getSetting().subscribe((result) => {
            this.homeModel = result;
        });
    }
    onChangeBanner(event, index) {
        const filesUpload = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(filesUpload);
        switch (index) {
            case 1:
                this.homeModel.bannerFile1 = filesUpload;
                break;
            case 2:
                this.homeModel.bannerFile2 = filesUpload;
                break;
            case 3:
                this.homeModel.bannerFile3 = filesUpload;
                break;
            case 4:
                this.homeModel.bannerFile4 = filesUpload;
                break;
            default:
                break;
        }
    }
    updateBanner() {
        this.homeService.updateBanner(this.homeModel).subscribe((res) => {
            this.getHomeSetting();
        });
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