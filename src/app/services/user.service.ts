import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface User {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>('assets/user.json');
  }
}
