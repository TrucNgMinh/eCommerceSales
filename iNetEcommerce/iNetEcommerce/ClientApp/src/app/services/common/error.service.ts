import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LocalService } from './local.service';

/**
 * Default error handler
 */
@Injectable()
export class ErrorService {

  constructor(private router: Router,
  ) {
  }

  /**
   * Handle error function
   * @param {Response} error
   * @return {any}
   */
  public handleError(error: HttpErrorResponse): any {
    if (error.status === 401) {
      LocalService.logout();
      this.router.navigate(['/login']);
    }
    else if (error.status === 503) {
      this.router.navigate(['/maintainance']);
    }
    else {
      let message = '';
      if (error.status === 403 && (!error.error || !error.error.error)) {
        message = 'Bạn không có quyền sử dụng chức năng này'
      }
      
      if (error.error && error.error.error) {
        if (error.error.error.innerError) {
          message = error.error.error.innerError
        } else if (error.error.error.message) {
          message = error.error.error.message;
        }
      }
    }

    return throwError(error);
  }
}
