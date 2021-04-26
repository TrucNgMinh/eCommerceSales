import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from 'src/app/services/product-group.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productGroups: any;

  constructor(private productGroupService: ProductGroupService) { }

  ngOnInit(): void {
    this.getProductGroups();
  }
  getProductGroups():void {
    this.productGroupService.getProductGroups().subscribe((res)=>{
      this.productGroups = res;
    })
  }

}

