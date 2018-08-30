import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(`user/${userId}`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getFeed(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(`user/${userId}/feed`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  follow(userId) {
    return new Promise((resolve, reject) => {
      this.http.post(`user/${userId}/follow`, {}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  unfollow(userId) {
      return new Promise((resolve, reject) => {
        this.http.delete(`user/${userId}/follow`).subscribe((res) => {
          resolve(res);
        });
      });
  }
}
