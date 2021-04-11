import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})

export class HomeUserComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    $("#readmore").on("click", function() {
      let dots = $("#dots");
      let moreText =$("#readmore-content"); document.getElementById("readmore-content");
      let btnText =$("#readmore");

      if (dots.css("display") === "none") {
          dots.css("display","inline");
          btnText.text("Xem thêm");
          moreText.css("display","none");
      } else {
          dots.css("display","none");
          btnText.text("Thu gọn");
          moreText.css("display","inline");
      }
  });
  }

  ngOnInit(): void {
  }

  

}
