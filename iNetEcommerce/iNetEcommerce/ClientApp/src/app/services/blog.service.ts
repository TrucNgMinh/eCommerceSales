import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../app.constants';
import { Blog } from '../models/blog.model';
import { BaseService } from './common/base.service';
import { ErrorService } from './common/error.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService {
  constructor(protected http: HttpClient,
      protected errorHandler: ErrorService,
      protected globalService: GlobalService) {
      super(http, errorHandler, globalService);
  }

  addEditBlog(model: Blog): Observable<any> {
    return this.post(API_ENDPOINT.ADD_EDIT_BLOG, model, false);
  }

  getBlogs(): Observable<Blog[]>{
    var result = this.get(API_ENDPOINT.GET_BLOGS, null, false);
    return result;
  }

}
