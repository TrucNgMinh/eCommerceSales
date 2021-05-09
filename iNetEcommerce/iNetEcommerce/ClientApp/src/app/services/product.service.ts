import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../app.constants';
import { ProductGroup } from '../models/product-group.model';
import { Product } from '../models/product.model';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  constructor(protected http: HttpClient,
      protected errorHandler: ErrorService,
      protected globalService: GlobalService) {
      super(http, errorHandler, globalService);
  }

  addEditProduct(model: Product): Observable<any> {
    return this.postFormData(API_ENDPOINT.ADD_EDIT_PRODUCT, model, true);
  }

  deleteProduct(model: Product): Observable<any> {
    return this.post(API_ENDPOINT.DELETE_PRODUCT, model, true);
  }

  getProducts(): Observable<Product[]>{
    var result = this.get(API_ENDPOINT.GET_PRODUCTS, null, true);
    return result;
  }

  getProductById(id : number): Observable<Product>{
    var result = this.get(API_ENDPOINT.GET_PRODUCT_BY_ID, {productId : id}, true);
    return result;
  }

  getProductAdmin(id : number): Observable<Product>{
    var result = this.get(API_ENDPOINT.GET_PRODUCT_ADMIN, {productId : id}, true);
    return result;
  }

}
