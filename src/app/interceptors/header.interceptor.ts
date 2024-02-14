import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, finalize } from 'rxjs';

import { environment } from 'src/environment/environment';

import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  private apiUrl: string = environment.apiUrl + '/api';
  private activeRequest = 0;

  constructor(private ngxUILoaderService: NgxUiLoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isApiUrl = req.url.startsWith(this.apiUrl);
    if (isApiUrl) {
      if (this.activeRequest === 0) {
        this.ngxUILoaderService.start();
      }
      this.activeRequest++;
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    }

    return next.handle(req).pipe(finalize(() => this.detenerLoader()));
  }

  private detenerLoader(): void {
    this.activeRequest--;
    if (this.activeRequest === 0) {
      this.ngxUILoaderService.stop();
    }
  }
}
