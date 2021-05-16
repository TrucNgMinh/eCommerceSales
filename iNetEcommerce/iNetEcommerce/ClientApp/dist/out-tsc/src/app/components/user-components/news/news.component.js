import { __decorate } from "tslib";
import { Component } from '@angular/core';
let NewsComponent = class NewsComponent {
    constructor(blogService) {
        this.blogService = blogService;
        this.blogs = [];
    }
    ngOnInit() {
        this.getBlogs();
    }
    getBlogs() {
        this.blogService.getBlogs().subscribe((res) => {
            this.blogs = res;
        });
    }
};
NewsComponent = __decorate([
    Component({
        selector: 'app-news',
        templateUrl: './news.component.html',
        styleUrls: ['./news.component.css']
    })
], NewsComponent);
export { NewsComponent };
//# sourceMappingURL=news.component.js.map