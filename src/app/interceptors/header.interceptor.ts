import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environment/environment';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    private apiUrl: string = environment.apiUrl;

    constructor () { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiUrl = req.url.startsWith(this.apiUrl);
        
        if (isApiUrl) {
            req = req.clone({
               setHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               } 
            });
        }

        return next.handle(req);
    }
}
