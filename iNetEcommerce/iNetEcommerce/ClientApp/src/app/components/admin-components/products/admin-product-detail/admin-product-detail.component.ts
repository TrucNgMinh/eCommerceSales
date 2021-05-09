import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Editor } from 'ngx-editor';
import { ProductGroup } from 'src/app/models/product-group.model';
import { Product } from 'src/app/models/product.model';
import { ProductGroupService } from 'src/app/services/product-group.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  editor: Editor = new Editor();
  html: any = '';
  productModel: Product = new Product();
  productGroupDropList: ProductGroup[] = [];
  productGroupDropListSelected: ProductGroup[] = [];
  productGroupDropListSettings: IDropdownSettings = {};
  constructor(private productGroupService: ProductGroupService) { }
  ngAfterViewInit(): void {
    this.getProductGroups();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnInit(): void {
    this.productGroupDropListSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Hủy chọn tất cả',
      itemsShowLimit: 4,
      allowSearchFilter: false
    };
    this.getProductGroups();
  }
  getProductGroups():void {
    this.productGroupService.getProductGroups().subscribe((res)=>{
      this.productGroupDropList = res;
    })
  }

  addProduct(form: NgForm):void {
    console.log("a");
  }

  

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
