import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-layout-admin',
  templateUrl: './main-layout-admin.component.html',
  styleUrls: ['./main-layout-admin.component.css']
})
export class MainLayoutAdminComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    $("#menu-icon-left").on("click", function () {
      let $navCustom = $(".navbar-custom");
      let $nav = $("#navigation");

      if ($navCustom.css("display") === "none") {

        $navCustom.attr('style', 'display:block !important');
        $nav.attr('style', 'display:block !important');

      } else {

        $navCustom.attr('style', 'display:none !important');
        $nav.attr('style', 'display:none !important');

      }
    });
  }

  ngOnInit(): void {
    if (!AuthService.isLoggedIn())
    {
      this.router.navigate(["login"]);
    }
  }

}