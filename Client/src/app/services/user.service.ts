import { Injectable } from '@angular/core';
import {APIURL} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(APIURL + `user/${userId}`, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getFeed(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(APIURL + `user/${userId}/feed`, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  follow(userId) {
    return new Promise((resolve, reject) => {
      this.http.post(APIURL + 'user/' + userId + '/follow', {}, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  unfollow(userId) {
      return new Promise((resolve, reject) => {
        this.http.delete(APIURL + 'user/' + userId + '/follow', {withCredentials: true}).subscribe((res) => {
          resolve(res);
        });
      });
  }
}
