import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/common/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login = new Login;
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
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

}
