import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroupService } from 'src/app/services/product-group.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productGroups: any;
  productsSrc: any;
  products: any;
  productGroupId: any;

  constructor(
    private productGroupService: ProductGroupService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.getQueryParam();
    
    this.getProductGroups();

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

        this.loadByGroup();

      });

    });

  }

  loadByGroup():void {
    console.log(this.productsSrc);
    this.products = this.productsSrc;
  }

}

