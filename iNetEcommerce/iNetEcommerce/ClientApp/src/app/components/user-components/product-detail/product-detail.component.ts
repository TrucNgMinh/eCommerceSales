import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getQueryParams();
    
  }

  getProduct(id:number): void {
    this.productService.getProductById(id).subscribe ( (result) => {
      this.product = result;
    })
  }

  getQueryParams():void {

    this.route.params.subscribe(params => {

      this.productId = +params['id'];

      this.getProduct(this.productId);

    });
  }

}
