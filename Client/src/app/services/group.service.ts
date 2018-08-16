import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  join(groupId) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiurl + 'group/' + groupId + '/membership', {}, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  leave(groupId) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.apiurl + 'group/' + groupId + '/membership', {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async get(groupId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiurl + `group/${groupId}`, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getMembers(groupId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiurl + `group/${groupId}/members`, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  getFeed(groupId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiurl + `group/${groupId}/feed`, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async create(obj) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiurl}group`, obj, {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiurl + 'group', {withCredentials: true}).subscribe((res) => {
        resolve(res);
      });
    });
  }
}
