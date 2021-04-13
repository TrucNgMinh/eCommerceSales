import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout-admin',
  templateUrl: './main-layout-admin.component.html',
  styleUrls: ['./main-layout-admin.component.css']
})
export class MainLayoutAdminComponent implements OnInit, AfterViewInit {

  constructor() { }

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

    jsFile.forEach((item) => {
      var $object = document.getElementById(item.name);
      if ($object) {
        $object.remove();
      }

      let script = document.createElement("script");
      script.setAttribute("id", item.name);
      script.setAttribute("src", item.src);
      document.body.appendChild(script);
    });
  }

  ngOnInit(): void {
  }

}

export const jsFile = [
  {
    name: "slimScroll",
    src: "../assets/js/jquery.slimscroll.js"
  },
  {
    name: "metisMenu",
    src: "../assets/js/metisMenu.min.js"
  },
  {
    name: "jqueryApp",
    src: "../assets/js/jquery.app.js"
  },
  {
    name: "jqueryCore",
    src: "../assets/js/jquery.core.js"
  }
]