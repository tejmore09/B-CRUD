import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData = new BehaviorSubject<any>({});
  reloadData = new BehaviorSubject<any>(true);

  constructor(private http: HttpClient) { }

  addUser(data: any): Observable<any>{
    return this.http.post('http://localhost:3000/users', data);
  }

  getUserList(): Observable<any>{
    return this.http.get('http://localhost:3000/users');
  }  

  updateUser(userId,payload): Observable<any>{
    return this.http.put(`http://localhost:3000/users/${userId}`, payload);
  }

  deleteUser(userId): Observable<any>{
    return this.http.delete(`http://localhost:3000/users/${userId}`);
  }
}
