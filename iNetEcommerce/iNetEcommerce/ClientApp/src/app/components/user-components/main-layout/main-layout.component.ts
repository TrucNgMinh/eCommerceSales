import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit,AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    $("#menu-icon-left").on("click", function() {
      let $nav = $(".navbar-custom");
      if ($nav.css("display") === "none") {
        $nav.attr('style', 'display:block !important');
    } else {
      $nav.attr('style', 'display:none !important');
    }
  });
  }

}
