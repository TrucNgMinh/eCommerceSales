import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../app.constants';
import { Home } from '../models/home.model';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {
  constructor(protected http: HttpClient,
      protected errorHandler: ErrorService,
      protected globalService: GlobalService) {
      super(http, errorHandler, globalService);
  }

  updateBanner(model: Home): Observable<any> {
    return this.postFormData(API_ENDPOINT.UPDATE_BANNER, model, true);
  }

  getSetting(): Observable<Home>{
    var result = this.get(API_ENDPOINT.GET_SETTINGS, null, true);
    return result;
  }

}
