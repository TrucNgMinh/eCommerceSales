import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModel } from 'src/app/models/image.model';
import { ProductGroup } from 'src/app/models/product-group.model';
import { Product } from 'src/app/models/product.model';
import { ProductGroupService } from 'src/app/services/product-group.service';
import { ProductService } from 'src/app/services/product.service';
import UtilCommons from 'src/app/utils/util-common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: any;
  product: Product = new Product();
  images: ImageModel[] = [];
  productGroups: ProductGroup[] = [];
  isMobile :boolean = false;

  constructor(
    private productGroupService: ProductGroupService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getQueryParams();
    
    this.getProductGroups();

    this.isMobile = UtilCommons.isMobile();

  }

  getProductGroups():void {

    this.productGroupService.getProductGroups().subscribe((res)=>{

      this.productGroups = res;

    });

  }

  generateImageCasoul():void {
    this.product.images.forEach(element => {
      this.images.push( new ImageModel(element));
    });
  }

  getProduct(id:number): void {
    this.productService.getProductById(id).subscribe ( (result) => {
      this.product = result;
      this.generateImageCasoul();
    })
  }

  getQueryParams():void {

    this.route.params.subscribe(params => {

      this.productId = +params['id'];

      this.getProduct(this.productId);

    });
  }

}
