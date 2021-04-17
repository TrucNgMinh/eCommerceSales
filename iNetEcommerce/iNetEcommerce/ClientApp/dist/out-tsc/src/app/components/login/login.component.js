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
        LocalService.setLogStatus(true);
        LocalService.setAccessToken("abcabc");
        this.router.navigate(["admin"]);
        //Implement later
        // if (form.invalid) {
        //   return;
        // }
        //   this.authService.login(this.model)
        //   .subscribe(data => {
        //     if (data && data.token) {
        //       LocalService.setAccessToken(data.token);
        //       LocalService.setLogStatus(true);
        //       LocalService.setUserName(data.fullName);
        //       LocalService.setUserId(data.userId);
        //     }
        //   },
        //     () => {
        //       this.model = new Login();
        //     });
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