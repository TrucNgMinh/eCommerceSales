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

  constructor(
    private productGroupService: ProductGroupService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngAfterViewInit(): void {
    let that = this;
    $(".category-list-item").on("click", function(){
      let $listItem = $(".category-list-item");
      $.each( $listItem, function( key, value ) {
        $(value).removeClass("active");
      });
    })
  }

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

        this.loadByGroup(this.productGroupId);

      });

    });

  }

  loadByGroup(groupId: number):void {
    this.products = this.productsSrc.filter(p=>p.productGroups.includes(groupId));
  }

}

