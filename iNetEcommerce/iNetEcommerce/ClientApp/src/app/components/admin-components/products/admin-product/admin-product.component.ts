import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/models/product-group.model';
import { ProductGroupService } from 'src/app/services/product-group.service';
declare var $: any;
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, AfterViewInit {
  productGroups: ProductGroup[] = [];
  constructor(private productGroupService: ProductGroupService) { }
  ngAfterViewInit(): void {
    console.log("loaded");
    $("#toggle-inside").on("click", "span.footable-toggle",function (evt: any) {
        console.log("toggled");
    })
  }

  ngOnInit(): void {
    // this.productGroupService.getProductGroups().subscribe((data) => {
    //   console.log(data);
    //   this.productGroups = data;
    //   console.log(this.productGroups);
    // })
  }

}
