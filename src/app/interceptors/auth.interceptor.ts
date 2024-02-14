import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environment/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiUrl: string = environment.apiUrl + '/api';

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.checkToken();
    const isApiUrl = req.url.startsWith(this.apiUrl);

    if (isApiUrl && token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
    }

    return next.handle(req);
  }
}
