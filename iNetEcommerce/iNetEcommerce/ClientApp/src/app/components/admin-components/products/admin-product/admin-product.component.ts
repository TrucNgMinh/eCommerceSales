import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  productGroupModel: ProductGroup = new ProductGroup();
  productModel: Product = new Product();

  constructor(private productGroupService: ProductGroupService,
    private modalService: NgbModal) { }
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
    })
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      console.log("modal opened");
    })
  }

  addProduct(form: NgForm):void {
    
  }

}
