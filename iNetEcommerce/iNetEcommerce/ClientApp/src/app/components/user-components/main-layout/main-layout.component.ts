import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {

  constructor() { }
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
