import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/home.model';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit, AfterViewInit {

  homeModel: Home = new Home();

  constructor() { }
  ngAfterViewInit(): void {
    (<any>$('.colorpicker-default')).colorpicker({
      format: 'hex'
    });
    (<any>$('.colorpicker-rgba')).colorpicker();
  }

  ngOnInit(): void {
  }

  onChangeBanner(event: any, index: number): void {
    
    const filesUpload: File = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(filesUpload);

    switch (index) {
      case 1:
        this.homeModel.bannerFile1 = filesUpload;
        break;
      case 2:
        this.homeModel.bannerFile2 = filesUpload;
        break;
      case 3:
        this.homeModel.bannerFile3 = filesUpload;
        break;
      case 4:
        this.homeModel.bannerFile4 = filesUpload;
        break;
      default:
        break;
    }

  }

}