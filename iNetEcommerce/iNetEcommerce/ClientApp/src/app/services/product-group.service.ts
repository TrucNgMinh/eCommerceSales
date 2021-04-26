import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../app.constants';
import { ProductGroup } from '../models/product-group.model';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService extends BaseService {
  constructor(protected http: HttpClient,
      protected errorHandler: ErrorService,
      protected globalService: GlobalService) {
      super(http, errorHandler, globalService);
  }

  addEditProductGroup(model: ProductGroup): Observable<any> {
    return this.post(API_ENDPOINT.ADD_EDIT_PRODUCT_GROUP, model, true);
  }

  deleteProductGroup(model: ProductGroup): Observable<any> {
    return this.post(API_ENDPOINT.DELETE_PRODUCT_GROUP, model, true);
  }

  getProductGroups(): Observable<ProductGroup[]>{
    var result = this.get(API_ENDPOINT.GET_PRODUCT_GROUP, null, true);
    return result;
  }

}
