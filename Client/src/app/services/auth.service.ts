import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  identity: Object;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.http.get(environment.apiurl + 'auth/identity', {withCredentials: true}).subscribe(
      (res) => {
        this.identity = res;
        this.isLoggedIn = true;
      },
      (err) => {
        console.warn(err);
        this.identity = null;
        this.isLoggedIn = false;
      }
    );

  }

  login(email: any, password: any) {
    this.http.post(environment.apiurl + 'auth/login', {email, password}, {withCredentials: true}).subscribe(
      (res) => {
        this.identity = res;
        this.isLoggedIn = true;
      },
      (err) => {
        console.warn(err);
        this.identity = null;
        this.isLoggedIn = false;
      }
    );
  }

  logout() {
    this.identity = null;
    this.isLoggedIn = false;
    this.http.delete(environment.apiurl + 'auth/logout', {withCredentials: true}).subscribe(() => {});
  }
}
