import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/models/product-group.model';
import { ProductGroupService } from 'src/app/services/product-group.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  productGroups: ProductGroup[] = [];

  constructor(private productGroupService: ProductGroupService) { }
  ngAfterViewInit(): void {
    $("#menu-icon-left").on("click", function() {
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

  $(".has-submenu").on("click", function (evt: any) {
    let $subMenuClicked = $(evt.currentTarget);
    let $subMenuMegaMenu = $subMenuClicked.find(".submenu");
    if ($subMenuClicked.hasClass("open")) {
      $subMenuClicked.removeClass("open");
      $subMenuMegaMenu.removeClass("open");
    }
    else{
      $subMenuClicked.addClass("open");
      $subMenuMegaMenu.addClass("open");
    }
  })
  }

  ngOnInit(): void {
  }

}
