import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  async get(postId) {
    return new Promise((resolve, reject) => {
      this.http.get(`post/${postId}?extended=true`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async create(obj) {
    return new Promise((resolve, reject) => {
      this.http.post(`post`, obj).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.http.get('post').subscribe((res) => {
        resolve(res);
      });
    });
  }

  delete(postId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`post/${postId}`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getComments(postId) {
    return new Promise((resolve, reject) => {
      this.http.get(`post/${postId}/comments`).subscribe((comments) => {
        resolve(comments);
      });
    });
  }

  async postComment(postId, comment) {

    return new Promise((resolve, reject) => {
      this.http.post(`post/${postId}/comment`, {body: comment}).subscribe((res) => {
        this.http.get(`post/${postId}`).subscribe((post) => {
          resolve(post);
        });
      });
    });

  }

  deleteComment(postId, commentId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`post/${postId}/comment/${commentId}`).subscribe((res) => {
        resolve(res);
      });
    });
  }
}
