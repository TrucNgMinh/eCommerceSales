import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/home.model';
import { ImageModel } from 'src/app/models/image.model';
import { HomeService } from 'src/app/services/home.service';
declare var $:any;

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})

export class HomeUserComponent implements OnInit, AfterViewInit {
  images: ImageModel[] = [];
  homeModel: Home = new Home();
  constructor(
    private homeService: HomeService
  ) { }

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
    this.getHomeSetting();
  }

  generateImageCasoul():void {
    if( this.homeModel.banner1 ) {
      this.images.push( new ImageModel(this.homeModel.banner1));
    }
    if( this.homeModel.banner2 ) {
      this.images.push( new ImageModel(this.homeModel.banner2));
    }
    if( this.homeModel.banner3 ) {
      this.images.push( new ImageModel(this.homeModel.banner3));
    }
    if( this.homeModel.banner4 ) {
      this.images.push( new ImageModel(this.homeModel.banner4));
    }
  }

  getHomeSetting():void {
    this.homeService.getSetting().subscribe((res)=> {
      this.homeModel = res;
      this.generateImageCasoul();
    })
  }

}
