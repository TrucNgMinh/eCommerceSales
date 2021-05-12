import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})

export class HomeUserComponent implements OnInit, AfterViewInit {
  images2 = [
    {
        path: '/assets/images/photo-1445452916036-9022dfd33aa8.jfif',
    },
    {
        path: '/assets/images/photo-1443996104801-80c82e789b18.jfif',
    },
    {
        path: '/assets/images/photo-1505839673365-e3971f8d9184.jfif',
    },
    {
        path: '/assets/images/photo-1545420333-23a22b18b8fa.jfif',
    },
];
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
