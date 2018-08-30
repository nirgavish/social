import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  identity: Object;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.http.get('auth/identity').subscribe(
      (res) => {
        this.identity = res;
        this.isLoggedIn = true;
      },
      (err) => {
        // console.warn(err);
        this.identity = null;
        this.isLoggedIn = false;
      }
    );

  }

  login(email: any, password: any) {
    this.http.post('auth/login', {email, password}).subscribe(
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
    this.http.delete('auth/logout').subscribe(() => {});
  }
}
