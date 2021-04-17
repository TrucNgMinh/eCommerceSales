import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { shareReplay, timeout, catchError } from 'rxjs/operators';
import { API_URL_PREFIX, API_HOST, REQUEST_TIMEOUT } from '../../app.constants';
import { LocalService } from './local.service';
import { Observable } from 'rxjs';
import { map, } from 'rxjs/operators';
declare var require: any

@Injectable()
export class BaseService {
  static defaultHeader = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Max-Age': '3600',
    'api-supported-versions': '1.0'
  };
  static formdataHeader = {
    'enctype': 'multipart/form-data'
  };
  private caches: any = {};
  protected apiHost = API_HOST;
  protected apiUrlPrefix = API_URL_PREFIX;

  protected headers: HttpHeaders;

  public createAPIURL(path: string): string {
    return this.apiHost + this.apiUrlPrefix + path;
  }

  constructor(protected http: HttpClient,
    protected errorHandler: ErrorService,
    protected globalService: GlobalService) {
    this.headers = new HttpHeaders(BaseService.defaultHeader);
  }

  public get(url: string, params?: HttpParams | any, loader = true, cache = false, options = {}): Observable<Object | any> {
    this.loadToken();

    if (cache && this.caches[url]) {
      if (loader) {
        this.globalService.loading();
      }
      return this.caches[url] as any;
    }

    const fullUrl = this.createAPIURL(url);
    const lastOptions = { ...{ headers: this.headers, params: params }, ...options };
    let request: any;
    request = this.http.get(fullUrl, lastOptions)
      .pipe(
        catchError((err) => {
          return this.errorHandler.handleError(err);
        }),
        shareReplay(1),
        timeout(REQUEST_TIMEOUT)
      )

    if (cache) {
      this.caches[url] = request;
    }
    return request;
  }

  download(url: string, param: {} | any = undefined) {
    this.get(url, param, true, false, { observe: 'response', responseType: 'blob' as 'json' }).pipe(
      map((res: any) => {
        return {
          fileName: res.headers.get('fileName'),
          file: res.body
        }
      })
    )
      .subscribe((res: { file: any; fileName: any; }) => {
        var FileSaver = require('file-saver');
        FileSaver.saveAs(res.file, res.fileName);
      });
  }


  public post(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
    this.loadToken();
    const fullUrl = this.createAPIURL(url);
      return this.http.post(fullUrl, params, { headers: this.headers })
        .pipe(
         catchError((err) => {
            return this.errorHandler.handleError(err);
          }), 
          timeout(REQUEST_TIMEOUT)
          )
  }

  public put(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
    this.loadToken();

    const fullUrl = this.createAPIURL(url);
      this.globalService.loading();
      return this.http.put(fullUrl, params, { headers: this.headers })
        .pipe(         
          catchError((err) => {
          return this.errorHandler.handleError(err);
        }),timeout(REQUEST_TIMEOUT));

    }

  public remove(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
    this.loadToken();

    const fullUrl = this.createAPIURL(url);
      this.globalService.loading();
      return this.http.request('delete', fullUrl, { headers: this.headers, body: params })
        .pipe(catchError((err) => {
          return this.errorHandler.handleError(err);
        }),timeout(REQUEST_TIMEOUT))
  }

  protected putFormData(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {

    this.loadToken(true);

    const body = this.parseFormdata(params);
    const fullUrl = this.createAPIURL(url);

      return this.http.put(fullUrl, body, { headers: this.headers })
        .pipe(catchError((err) => {
          return this.errorHandler.handleError(err);
        }),timeout(REQUEST_TIMEOUT))
  }

  public postFormData(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
    this.loadToken(true);
    const body = this.parseFormdata(params);
    const fullUrl = this.createAPIURL(url);

    return this.http.post(fullUrl, body, { headers: this.headers })
    .pipe(catchError((err) => {
      return this.errorHandler.handleError(err);
    }),timeout(REQUEST_TIMEOUT))
  }

  private loadToken(isForm: boolean = false) {

    const token = LocalService.getAccessToken();

    if (token == '' || !token) {
      this.headers = new HttpHeaders(isForm ? BaseService.formdataHeader : BaseService.defaultHeader);
    }
    else {
      this.headers = new HttpHeaders({
        ...isForm ? BaseService.formdataHeader : BaseService.defaultHeader,
        ...{ 'Authorization': `Bearer ${token}` }
      });
    }
  }

  private parseFormdata(model: any) {
    const formdata = new FormData();
    Object.keys(model || {}).forEach(p => {
      if (model[p]) {
        if (Array.isArray(model[p])) {
          (model[p] as Array<any>).forEach(q => {
            formdata.append(p + '[]', q);
          });
        } else {
          formdata.append(p, model[p]);
        }
      }
    });

    return formdata;
  }
}
