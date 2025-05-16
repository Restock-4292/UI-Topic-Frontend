import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supply } from '../model/supply.entity';
import { Observable } from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  private readonly baseUrl = `${environment.serverBaseUrl}/supplies`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Supply[]> {
    return this.http.get<Supply[]>(this.baseUrl);
  }

  getById(id: number): Observable<Supply> {
    return this.http.get<Supply>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<Supply>): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: number, data: Partial<Supply>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
