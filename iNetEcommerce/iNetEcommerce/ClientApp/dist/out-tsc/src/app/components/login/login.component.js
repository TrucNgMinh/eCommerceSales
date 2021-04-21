import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Login } from 'src/app/models/login.model';
import { LocalService } from 'src/app/services/common/local.service';
let LoginComponent = class LoginComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.model = new Login;
    }
    ngOnInit() {
    }
    login(form) {
        if (form.invalid) {
            console.log("invalid");
            return;
        }
        this.authService.login(this.model)
            .subscribe(data => {
            console.log(data);
            if (data && data.token) {
                LocalService.setAccessToken(data.token);
                LocalService.setLogStatus(true);
            }
            this.router.navigate(["admin"]);
        }, () => {
            this.model = new Login();
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map