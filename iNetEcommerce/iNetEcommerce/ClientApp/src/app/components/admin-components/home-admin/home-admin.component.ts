import { AfterViewInit, Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    (<any>$('.colorpicker-default')).colorpicker({
        format: 'hex'
    });
    (<any>$('.colorpicker-rgba')).colorpicker();
  }

  ngOnInit(): void {
  }

}
