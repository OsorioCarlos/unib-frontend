import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivateAppService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
}
