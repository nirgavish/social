import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  async get(postId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiurl + `post/${postId}?extended=true`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async create(obj) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiurl + `post`, obj, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiurl + 'post', {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  delete(postId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.apiurl}post/${postId}`, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getComments(postId) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiurl}post/${postId}/comments`).subscribe((comments) => {
        resolve(comments);
      });
    });
  }

  async postComment(postId, comment) {

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiurl}post/${postId}/comment`, {body: comment}, {withCredentials: true}).subscribe((res) => {
        this.http.get(`${environment.apiurl}post/${postId}`).subscribe((post) => {
          resolve(post);
        });
      });
    });

  }

  deleteComment(postId, commentId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.apiurl}post/${postId}/comment/${commentId}`, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }
}
