import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModel } from 'src/app/models/image.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: any;
  product: Product = new Product();
  images: ImageModel[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getQueryParams();
    
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
