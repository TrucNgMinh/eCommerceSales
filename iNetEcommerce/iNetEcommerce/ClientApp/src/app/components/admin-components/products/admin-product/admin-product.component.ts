import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs-compat';
import { datatableLanguageOptions } from 'src/app/app.constants';
import { ProductGroup } from 'src/app/models/product-group.model';
import { Product } from 'src/app/models/product.model';
import { ProductGroupService } from 'src/app/services/product-group.service';

declare var $: any;
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, OnDestroy, AfterViewInit {
  productGroups: ProductGroup[] = [];
  products: Product[] =[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private productGroupService: ProductGroupService) { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: datatableLanguageOptions
    };

    this.getProductGroups();

  }

  getProductGroups():void {
    this.productGroupService.getProductGroups().subscribe((res)=>{
      this.productGroups = res;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
