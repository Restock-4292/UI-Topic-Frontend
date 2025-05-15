import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface User {
  name: string;
  email: string;
  address?: string;
  phone?: string;
  business_name?: string;
  username?: string;
  avatar: {
    url: string;
    alt: string;
  };
  role_id: {
    id: number;
    name: string;
  };
  age?: number;
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
