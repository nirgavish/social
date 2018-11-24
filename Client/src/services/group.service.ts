import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  join(groupId) {
    return new Promise((resolve, reject) => {
      this.http.post(`group/${groupId}/membership`, {}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  leave(groupId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`group/${groupId}/membership`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async get(groupId) {
    return new Promise((resolve, reject) => {
      this.http.get(`group/${groupId}`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getMembers(groupId) {
    return new Promise((resolve, reject) => {
      this.http.get(`group/${groupId}/members`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getFeed(groupId) {
    return new Promise((resolve, reject) => {
      this.http.get(`group/${groupId}/feed`).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async create(obj) {
    return new Promise((resolve, reject) => {
      this.http.post('group', obj).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.http.get('group').subscribe((res) => {
        resolve(res);
      });
    });
  }
}
