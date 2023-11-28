import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PrivateAppService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
  get(url: string, params = new HttpParams()) {
    url = this.apiUrl + url;
    return this.http.get(url, { params });
  }

  post(url: string, data?: any, params = new HttpParams()) {
    url = this.apiUrl + url;
    return this.http.post(url, data, { params });
  }

  put(url: string, data?: any, params = new HttpParams()) {
    url = this.apiUrl + url;
    return this.http.put(url, data, { params });
  }

  delete(url: string, params = new HttpParams()) {
    url = this.apiUrl + url;
    return this.http.delete(url, { params });
  }
}
