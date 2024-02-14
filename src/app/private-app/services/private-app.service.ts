import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class PrivateAppService {
  private apiUrl: string = environment.apiUrl + '/api';

  constructor(private http: HttpClient) {}

  public obtener(route: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${route}`;
    return this.http.get<any>(url);
  }

  public crear(route: string, data: any): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${route}`;
    return this.http.post<any>(url, data);
  }

  public actualizar(
    route: string,
    id: number,
    data: any
  ): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${route}/${id}`;
    return this.http.put<any>(url, data);
  }

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
