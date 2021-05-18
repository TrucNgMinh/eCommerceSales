import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroup } from 'src/app/models/product-group.model';
import { Product } from 'src/app/models/product.model';
import { ProductGroupService } from 'src/app/services/product-group.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  productGroups: ProductGroup[] = [];
  productsSrc: Product[] = [];
  products: Product[] = [];
  productGroupId: any;
  isMobile: boolean = false;

  constructor(
    private productGroupService: ProductGroupService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.getQueryParam();
    
    this.getProductGroups();

    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log(this.isMobile);

  }

  getQueryParam():void {

    this.route.params.subscribe(params => {

      this.productGroupId = +params['id'];

    })

  }

  getProductGroups():void {

    this.productGroupService.getProductGroups().subscribe((res)=>{

      this.productGroups = res;

      this.productService.getProducts().subscribe((prods) => {

        this.productsSrc = prods;

        this.loadByGroup(this.productGroupId);

      });

    });

  }

  loadByGroup(groupId: number):void {
    if (groupId == 0) {
      this.products = this.productsSrc;
    }else {
      this.products = this.productsSrc.filter(p=>p.productGroups.includes(groupId));
    }
  }

}

