import { Injectable } from '@angular/core';
import {APIURL} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  identity: Object;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.http.get(APIURL + 'auth/identity', {withCredentials: true}).subscribe(
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
    this.http.post(APIURL + 'auth/login', {email, password}, {withCredentials: true}).subscribe(
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
    this.http.delete(APIURL + 'auth/logout', {withCredentials: true}).subscribe(() => {
      this.identity = null;
      this.isLoggedIn = false;
    });
  }
}
