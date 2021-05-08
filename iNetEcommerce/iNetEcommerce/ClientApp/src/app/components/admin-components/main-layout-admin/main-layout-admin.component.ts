import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductGroup } from 'src/app/models/product-group.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductGroupService } from 'src/app/services/product-group.service';

@Component({
  selector: 'app-main-layout-admin',
  templateUrl: './main-layout-admin.component.html',
  styleUrls: ['./main-layout-admin.component.css']
})
export class MainLayoutAdminComponent implements OnInit, AfterViewInit {
  productGroups: ProductGroup[] = [];
  constructor(private router: Router, private productGroupService : ProductGroupService) { }

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

    this.getProductGroups();
    
  }
  getProductGroups():void {
    this.productGroupService.getProductGroups().subscribe((res)=>{
      this.productGroups = res;
    })
  }

}