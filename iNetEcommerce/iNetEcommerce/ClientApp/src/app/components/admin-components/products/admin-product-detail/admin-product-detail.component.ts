import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ngEditorOptions } from 'src/app/app.constants';
import { ProductGroup } from 'src/app/models/product-group.model';
import { Product } from 'src/app/models/product.model';
import { ProductGroupService } from 'src/app/services/product-group.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  productModel: Product = new Product();
  productGroupDropList: ProductGroup[] = [];
  productGroupDropListSelected: ProductGroup[] = [];
  productGroupDropListSettings: IDropdownSettings = {};
  files: File[] = [];
  editorConfig: any;
  htmlContent: string = '';

  constructor(
    private productGroupService: ProductGroupService,
    private productService: ProductService,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.getProductGroups();
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.editorConfig = ngEditorOptions;
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
  getProductGroups(): void {
    this.productGroupService.getProductGroups().subscribe((res) => {
      this.productGroupDropList = res;
    })
  }

  addProduct(form: NgForm): void {
    if (!form.valid) 
      return;
    this.productModel.productGroups = this.productGroupDropListSelected.map(({ id }) => id);
    console.log(this.productModel.productGroups);

    this.productService.addEditProduct(this.productModel).subscribe((res) => {
      this.router.navigate(['/admin/admin-product']);
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

}
