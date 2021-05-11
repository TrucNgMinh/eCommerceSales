import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs-compat';
import { datatableLanguageOptions } from 'src/app/app.constants';
import { ProductGroup } from 'src/app/models/product-group.model';
import { Product } from 'src/app/models/product.model';
import { ProductGroupService } from 'src/app/services/product-group.service';
import { ProductService } from 'src/app/services/product.service';
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
  dtTriggerProduct: Subject<any> = new Subject<any>();
  productGroupModel: ProductGroup = new ProductGroup();
 

  constructor(private productGroupService: ProductGroupService,
    private modalService: NgbModal,
    private productService: ProductService,
    private route: ActivatedRoute) { }
    ngAfterViewInit(): void {
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      paging: true,
      language: datatableLanguageOptions,

    };

    this.getProductGroups(true);


  }

  getProductGroups(isTrigger = false):void {
    this.productGroupService.getProductGroups().subscribe((res)=>{
      this.productGroups = res;
      if (isTrigger)
        this.dtTrigger.next();

      this.getProducts(isTrigger);
    })
  }

  getProducts(isTrigger = false):void {
    this.productService.getProducts().subscribe((res) => {
        this.products = res;
        if (isTrigger)
          this.dtTriggerProduct.next();
    });
  }

  addProductGroup(form: NgForm):void {
    if (form.invalid) {
      return;
    }
    this.productGroupService.addEditProductGroup(this.productGroupModel).subscribe((res : any) => {
      this.getProductGroups();
      this.modalService.dismissAll();
    });
  }

  removeProductGroup(id: Number): void {
    let model = new ProductGroup();
    model.id = id;
    this.productGroupService.deleteProductGroup(model).subscribe((res : any) => {
      this.getProductGroups();
    });
  }

  removeProduct(id: Number): void {
    let model = new Product();
    model.id = id;
    this.productService.deleteProduct(model).subscribe((res : any) => {
      this.getProducts();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTriggerProduct.unsubscribe();
  }

  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    })
  }

}
