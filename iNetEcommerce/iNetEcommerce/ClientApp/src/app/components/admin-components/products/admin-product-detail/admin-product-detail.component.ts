import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  productId: any;

  constructor(
    private productGroupService: ProductGroupService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.getProductGroups();
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.productId = +params['id'];

      if (this.productId > 0) {
        this.productService.getProductAdmin(this.productId).subscribe((res) => {
          this.productModel = res;
          console.log(this.productModel);
          this.getProductGroups();
        })
      }
      else {
        this.getProductGroups();
      }

    })

    this.editorConfig = ngEditorOptions;

    this.productGroupDropListSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Hủy chọn tất cả',
      itemsShowLimit: 4,
      allowSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm'
    };
  }
  getProductGroups(): void {
    this.productGroupService.getProductGroups().subscribe((res) => {
      this.productGroupDropList = res;
      if (this.productId > 0 && this.productGroupDropList.length > 0) {
        this.productGroupDropListSelected = this.productGroupDropList.filter(x => this.productModel.productGroups.includes(x.id));
        this.cd.detectChanges();
      }
    })
  }

  addProduct(form: NgForm): void {
    if (!form.valid)
      return;
    this.productModel.productGroups = this.productGroupDropListSelected.map(({ id }) => id);

    let fileLength = this.files.length > 4 ? 4 : this.files.length;

    switch(fileLength) {
      case 1:
        this.productModel.image1 = this.files[0];
        break;
      case 2:
        this.productModel.image1 = this.files[0];
        this.productModel.image2 = this.files[1];
        break;
      case 3:
        this.productModel.image1 = this.files[0];
        this.productModel.image2 = this.files[1];
        this.productModel.image3 = this.files[2];
        break;
      case 4:
        this.productModel.image1 = this.files[0];
        this.productModel.image2 = this.files[1];
        this.productModel.image3 = this.files[2];
        this.productModel.image4 = this.files[3];
        break;
      default:
        break;
    }

    this.productService.addEditProduct(this.productModel).subscribe((res) => {
      this.router.navigate(['/admin/admin-product']);
    });
  }

  onSelect(event: any) {
    console.log(event);
    if (this.files.length <= 4) {
      this.files.push(...event.addedFiles);
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
