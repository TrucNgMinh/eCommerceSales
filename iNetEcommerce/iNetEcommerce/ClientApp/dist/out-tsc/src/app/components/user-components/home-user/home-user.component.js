import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomeUserComponent = class HomeUserComponent {
    constructor() {
        this.images2 = [
            {
                path: '/assets/images/photo-1445452916036-9022dfd33aa8.jfif',
            },
            {
                path: '/assets/images/photo-1444065707204-12decac917e8.jfif',
            },
            {
                path: '/assets/images/photo-1505839673365-e3971f8d9184.jfif',
            }
        ];
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
    }
    ngOnInit() {
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