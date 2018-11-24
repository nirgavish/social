import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config;
  constructor(private http: HttpClient) {
    this.http.get('').subscribe(
      (res) => {
        this.config = res;
      },
      (err) => {
        this.config = null;
      }
    );

  }
}
